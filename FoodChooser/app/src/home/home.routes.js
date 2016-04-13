var app;
(function (app) {
    var home;
    (function (home) {
        var main = angular.module("homeModule");
        main.config(routeConfig);
        routeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
        function routeConfig($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('home', {
                url: '/',
                controller: "home.controllers.homeController",
                controllerAs: "vm",
                templateUrl: "src/home/Templates/overview.html"
            }).state('about', {
                url: "/about",
                templateUrl: "src/home/Templates/about.html"
            });
        }
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
