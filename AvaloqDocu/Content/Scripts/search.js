function Page() {
    var self = this;
    self.PageNumber = ko.observable(0);
}

function Package() {
    var self = this;
    self.Name = ko.observable("");
    self.PackageId = ko.observable("");
    self.Documents = ko.observableArray([]);
    self.Selected = ko.observable(false);
}

function SearchViewModel() {
    var self = this;
    self.query = ko.observable("");
    self.results = ko.observableArray([]);
    self.total = ko.observable(0);
    self.page = ko.observable(1);
    self.pages = ko.observable(1);
    self.queryTime = ko.observable(0);
    self.packages = ko.observableArray([]);
    self.packagePage = ko.observable(1);
    self.packageCount = ko.observable(0);
    self.packagePages = ko.observableArray([]);
    self.packageQuery = ko.observable("");
    self.selectedPackageId = ko.observable(0);
    self.selectedPackageName = ko.observable("");
    self.packageSelected = ko.observable(false);
    self.selectedPackageDocuments = ko.observableArray([]);

    self.search = function () {
        $.ajax({
            url: "/api/search/GetFreeTextSearch?query=" + self.query() + "&page=" + (self.page() - 1),
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                self.results(data.Results);
                self.total(data.Total);
                self.queryTime(data.QueryTime);
                self.setPageNumbers();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
                console.log(ajaxOptions);
                console.log(xhr);
            }
        });
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
        self.search();
    }

    self.searchPackages = function () {
        $.ajax({
            url: "/api/package/GetPackages?query=" + self.packageQuery() + "&page=" + self.packagePage(),
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                for (var p in data.packages) {
                    var pack = new Package();
                    pack.Name(p.Name);
                    pack.PackageId(p.PackageId);
                    pack.Documents([]);
                }
                self.packages(data.packages);
                self.packageCount(data.count);
                self.setPackagePageNumbers();
            }
        });
    }

    self.setPackagePageNumbers = function () {
        self.packagePages([]);
        var pages = Math.ceil(self.packageCount() / 5);
        for (var i = 0; i < pages; i++) {
            var pageToAdd = new Page();
            pageToAdd.PageNumber(i + 1);
            self.packagePages.push(pageToAdd);
        }
    }

    self.changePackagePage = function (page) {
        self.packagePage(page);
        self.searchPackages();
    }

    self.expandPackage = function (pack) {
        self.selectedPackageId(pack.PackageId);
        self.selectedPackageName(pack.Name);
        self.selectedPackageDocuments(pack.Documents);
        self.packageQuery(pack.Name);
    }

    self.selectPackage = function (pack) {
        self.packageSelected(true);
    }
}

$(document).ready(function () {
    var viewModelSearch = new SearchViewModel();
    ko.applyBindings(viewModelSearch, $('#searchPage')[0]);
    var url = window.location.href;
    viewModelSearch.query(url.split("=")[1]);
    viewModelSearch.search();
});