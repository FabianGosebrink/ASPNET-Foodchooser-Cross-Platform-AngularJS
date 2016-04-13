var app;
(function (app) {
    var account;
    (function (account) {
        angular.module("accountModule", ["ui.router"]);
    })(account = app.account || (app.account = {}));
})(app || (app = {}));
