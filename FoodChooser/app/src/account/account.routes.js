var app;
(function (app) {
    var home;
    (function (home) {
        var main = angular.module("accountModule");
        main.config(routeConfig);
        routeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
        function routeConfig($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('login', {
                url: '/login',
                templateUrl: "src/account/templates/login.html",
                controller: "account.controllers.accountController",
                controllerAs: "vm"
            }).state('register', {
                url: '/register',
                templateUrl: "src/account/templates/register.html",
                controller: "account.controllers.accountController",
                controllerAs: "vm"
            });
        }
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
