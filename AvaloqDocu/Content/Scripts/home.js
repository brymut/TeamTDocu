﻿function HomeViewModel() {
    var self = this;
    self.query = ko.observable("");
    self.releaseOptions = ko.observableArray([]);
    self.selectedRelease = ko.observable(0);
    self.functionalAreaOptions = ko.observableArray([]);
    self.selectedFunctionalAreas = ko.observableArray([]);
    self.docuTypeOptions = ko.observableArray([]);
    self.selectedDocuType = ko.observable(0);
    self.docuSubTypeOptions = ko.observableArray([]);
    self.selectedDocuSubType = ko.observable(0);

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

    self.selectedDocuType.subscribe(function (newValue) {
        self.selectedDocuSubType(0);
        self.docuSubTypeOptions([]);
        self.loadDocuSubTypes();
    })

    self.search = function () {
        window.location.href = "/search?query=" + self.query();
    }
}

$(document).ready(function () {
    var viewModelHome = new HomeViewModel();
    viewModelHome.init();
    ko.applyBindings(viewModelHome, $('#mainSearchDiv')[0]);
});