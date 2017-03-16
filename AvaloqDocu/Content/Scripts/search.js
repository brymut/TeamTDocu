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

function PackageDocument(item) {
    var self = this;
    self.DocumentID = ko.observable(item.DocumentID);
    self.Title = ko.observable(item.Title);
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
    self.documentsToAdd = ko.observableArray([]);

    self.releaseOptions = ko.observableArray([]);
    self.selectedRelease = ko.observable(0);
    self.functionalAreaOptions = ko.observableArray([]);
    self.selectedFunctionalAreas = ko.observableArray([]);
    self.docuTypeOptions = ko.observableArray([]);
    self.selectedDocuType = ko.observable(0);
    self.docuSubTypeOptions = ko.observableArray([]);
    self.selectedDocuSubType = ko.observable(0);

    self.filters = ko.observable(false);

    self.createPackageName = ko.observable("");

    self.init = function () {
        $.ajax({
            url: "/api/filter/GetReleaseOptions",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                self.releaseOptions(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
                console.log(ajaxOptions);
                console.log(xhr);
            }
        });

        $.ajax({
            url: "/api/filter/GetFunctionalAreas",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                self.functionalAreaOptions(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
                console.log(ajaxOptions);
                console.log(xhr);
            }
        });

        $.ajax({
            url: "/api/filter/GetDocuTypes",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                self.docuTypeOptions(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
                console.log(ajaxOptions);
                console.log(xhr);
            }
        });

        self.docuSubTypeOptions([]);
    }

    self.loadDocuSubTypes = function () {
        var t = self.selectedDocuType();
        if (isNaN(t)) {
            t = 0;
        }
        $.ajax({
            url: "/api/filter/GetDocuSubTypes?docuType=" + t,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                self.docuSubTypeOptions(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
                console.log(ajaxOptions);
                console.log(xhr);
            }
        });
    }

    self.selectedRelease.subscribe(function (newValue) {
        if (self.filters() || newValue != undefined) {
            self.filters(true);
            self.filterSearch();
        }
    })

    self.selectedFunctionalAreas.subscribe(function (newValue) {
        console.log(newValue);
        console.log(self.selectedFunctionalAreas());
        if (self.filters() || newValue != undefined) {
            self.filters(true);
            self.filterSearch();
        }
    })

    self.selectedDocuType.subscribe(function (newValue) {
        if (self.filters() || newValue != undefined) {
            self.filters(true);
            self.filterSearch();
        }
        self.selectedDocuSubType(0);
        self.docuSubTypeOptions([]);
        self.loadDocuSubTypes();
    })

    self.selectedDocuSubType.subscribe(function (newValue) {
        if (self.filters() || newValue != undefined) {
            self.filters(true);
            console.log("subtype " + newValue);
            self.filterSearch();
        }
    })

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
                self.filters(false);
                self.setPageNumbers();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
                console.log(ajaxOptions);
                console.log(xhr);
            }
        });
    }

    self.filterSearch = function () {
        $.ajax({
            url: "/api/search/GetFilterSearch?query=" + self.query()
                                            + "&page=" + (self.page() - 1)
                                            + "&pageSize=10"
                                            + "&titleOnly=false"
                                            + "&DocuID=0"
                                            + "&Release=" + self.selectedRelease()
                                            /*+ "&FunctionalArea=null" + self.selectedFunctionalAreas()*/
                                            + "&DocuType=" + self.selectedDocuType()
                                            + "&DocuSubType=" + self.selectedDocuSubType(),
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
        self.search();
    }

    self.searchPackages = function () {
        $.ajax({
            url: "/api/package/GetPackages?query=" + self.packageQuery() + "&page=" + self.packagePage(),
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //for (var p in data.packages) {
                //    var pack = new Package();
                //    pack.Name(p.Name);
                //    pack.PackageId(p.PackageId);
                //    pack.Documents([]);
                //}
                self.packages(data.packages);
                self.packageCount(data.count);
                self.setPackagePageNumbers();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
                console.log(ajaxOptions);
                console.log(xhr);
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
        if (pack.PackageId != self.selectedPackageId()) {
            self.selectedPackageId(pack.PackageId);
            self.selectedPackageName(pack.Name);
            self.selectedPackageDocuments(pack.Documents);
        } else {
            self.selectedPackageId(0);
            self.selectedPackageName("");
            self.selectedPackageDocuments([]);
        }
        
    }

    self.selectPackage = function (pack) {
        self.packageQuery(self.selectedPackageName());
        self.packageSelected(true);
        ko.utils.arrayForEach(self.selectedPackageDocuments(), function (doc) {
            ko.utils.arrayForEach(self.results(), function (res) {
                console.log(doc);
                console.log(res);
                if (doc.DocumentID == res.DocumentID) {
                    console.log("found match");
                    res.PrevInPackage = true;
                    res.InPackage = true;
                }
            });
        });
    }

    self.deselectPackage = function () {
        self.packageQuery("");
        self.selectedPackageName("");
        self.selectedPackageId(0);
        self.selectedPackageDocuments([]);
        self.packageSelected(false);
        ko.utils.arrayForEach(self.results(), function (res) {
            res.InPackage = false;
            res.PrevInPackage = false;
        })
    }

    self.addToPackage = function (doc) {
        if (doc.InPackage && !doc.PrevInPackage) {
            var d2 = new PackageDocument(doc);
            self.documentsToAdd.push(d2);
        } else {
            self.documentsToAdd.remove(function (documentsToAdd) {
                return documentsToAdd.DocumentID() == doc.DocumentID;
            });
        }
        return true;
    }

    self.saveToPackage = function () {
        var doc = {
            Documents: self.documentsToAdd(),
            PackageId: self.selectedPackageId()
        }

        model = ko.toJSON(doc);
        $.ajax({
            url: "/api/package/PostDocumentsToPackage",
            type: "POST",
            data: model,
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                ko.utils.arrayForEach(self.documentsToAdd(), function (add) {
                    self.selectedPackageDocuments.push(self.documentsToAdd.pop());
                })
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
                console.log(ajaxOptions);
                console.log(xhr);
            }
        })
    }

    // Can't download with ajax apparently - needs replaced
    self.downloadPackage = function () {
        $.ajax({
            url: "/api/package/DownloadPackage?packageId=" + self.selectedPackageId(),
            type: "GET",
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
            success: function (data) {

            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
                console.log(ajaxOptions);
                console.log(xhr);

            }
        })
    }

    self.createPackage = function () {
        $.ajax({
            url: "/api/package/PostNewPackage?name=" + self.createPackageName(),
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                self.selectedPackageId(data);
                self.selectedPackageName(self.createPackageName());
                self.createPackageName("");
                self.selectedPackageDocuments([]);
                self.packageQuery(self.selectedPackageName());
                self.packageSelected(true);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError);
                console.log(ajaxOptions);
                console.log(xhr);
            }
        })
    }
}

$(document).ready(function () {
    var viewModelSearch = new SearchViewModel();
    ko.applyBindings(viewModelSearch, $('#searchPage')[0]);
    var url = window.location.href;
    viewModelSearch.init();
    viewModelSearch.query(url.split("=")[1]);
    viewModelSearch.search();
});