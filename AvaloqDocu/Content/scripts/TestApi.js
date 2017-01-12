function TestApiViewModel() {
    var self = this;

    self.testApis = function () {
        $.ajax({
            url: "/api/package/PostNewPackage?name=test",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log("API 1 Success")
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("API 1 Failure")
            }
        });

        $.ajax({
            url: "/api/package/PostDocumentToPackage?documentId=1&packageId=1",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log("API 2 Success")
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("API 2 Failure")
            }
        });

        $.ajax({
            url: "/api/search/GetFreeTextSearch?query=test",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log("API 3 Success")
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("API 3 Failure")
            }
        });

        $.ajax({
            url: "/api/search/GetFilterSearch?query=test",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                console.log("API 4 Success")
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("API 4 Failure")
            }
        });
    }
}

$(document).ready(function () {
    viewModelTestApi = new TestApiViewModel();
    ko.applyBindings(viewModelTestApi, $('#TestApis')[0]);
    viewModelTestApi.testApis();
});
