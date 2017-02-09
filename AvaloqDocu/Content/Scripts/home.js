function HomeViewModel() {
    var self = this;
    self.query = ko.observable("");

    self.search = function () {
        window.location.href = "/search?query=" + self.query();
    }
}

$(document).ready(function () {
    var viewModelHome = new HomeViewModel();
    ko.applyBindings(viewModelHome, $('#mainSearchDiv')[0]);
});