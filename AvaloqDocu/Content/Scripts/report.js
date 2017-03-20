function ReportViewModel() {
    var self = this;
    self.Results = ko.observableArray([]);
    self.Total = ko.observable(0);

    self.formatDate = function (date) {
        if (date == null) {
            return "N/A";
        }
        else {
            return moment(date).format('DD/MM/YYYY');
        }
    }

    self.init = function() {
        $.ajax({
            url: "/api/report/GetDocumentsMissingMetadata",
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                self.Results(data.Results);
                self.Total(data.Total);
            }
        })
    }
}

$(document).ready(function () {
    var viewModelReport = new ReportViewModel();
    ko.applyBindings(viewModelReport, $('#reportPage')[0]);
    viewModelReport.init();
});