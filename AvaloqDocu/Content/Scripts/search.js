function SearchViewModel() {
    var self = this;
    self.query = ko.observable("");
    self.results = ko.observableArray([]);
    self.total = ko.observable(0);
    self.page = ko.observable(1);
    self.pages = ko.observable(1);
    self.queryTime = ko.observable(0);

    self.search = function () {
        $.ajax({
            url: "/api/search/GetFreeTextSearch?query=" + self.query() + "&page=" + self.page(),
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                self.results(data.Results);
                self.total(data.Total);
                self.queryTime(data.QueryTime);
                self.setPageNumbers();
            }
        })
    }

    self.formatDate = function (date) {
        if (date == null) {
            return "N/A";
        }
        else {
            return moment(date).format('DD/MM/YYYY');
        }
    }

    self.setPageNumbers = function () {
        self.pages(Math.ceil(self.total() / 10));
    }

    self.next = function () {
        self.page(self.page() + 1);
        self.search();
    }

    self.prev = function () {
        self.page(self.page() - 1);
        self.search();
    }

    self.updateQuery = function () {
        window.location.href = "/search?query=" + self.query();
        self.search();
    }
}

$(document).ready(function () {
    var viewModelSearch = new SearchViewModel();
    ko.applyBindings(viewModelSearch, $('#searchPage')[0]);
    var url = window.location.href;
    viewModelSearch.query(url.split("=")[1]);
    viewModelSearch.search();
});