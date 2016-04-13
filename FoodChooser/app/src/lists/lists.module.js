var app;
(function (app) {
    var lists;
    (function (lists) {
        angular.module("listsModule", ["ui.router"]);
    })(lists = app.lists || (app.lists = {}));
})(app || (app = {}));
