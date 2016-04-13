var app;
(function (app) {
    var home;
    (function (home) {
        var main = angular.module("homeModule", ["ui.router"]);
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
