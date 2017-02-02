function SearchViewModel() {
    var self = this;
    self.query = ko.observable("");
    self.results = ko.observableArray([]);

    self.search = function () {
        $.ajax({
            url: "/api/search/GetFreeTextSearch?query=" + self.query(),
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                self.results(data.Results);
            }
        })
    }
}

$(document).ready(function () {
    var viewModelSearch = new SearchViewModel();
    ko.applyBindings(viewModelSearch, $('#searchPage')[0]);
    var url = window.location.href;
    viewModelSearch.query(url.split("=")[1]);
    viewModelSearch.search();
});