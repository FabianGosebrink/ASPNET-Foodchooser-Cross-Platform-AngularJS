var app;
(function (app) {
    var common;
    (function (common) {
        angular.module('commonModule', []);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
