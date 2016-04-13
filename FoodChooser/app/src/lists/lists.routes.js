var app;
(function (app) {
    var lists;
    (function (lists) {
        var listsModule = angular.module("listsModule");
        listsModule.config(routeConfig);
        routeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
        function routeConfig($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('lists', {
                url: '/lists',
                templateUrl: "src/lists/Templates/lists.html",
                controller: "lists.controllers.listController",
                controllerAs: "vm"
            }).state('listDetails', {
                url: '/lists/:id',
                templateUrl: "src/lists/Templates/details.html",
                controller: "lists.controllers.listDetailsController",
                controllerAs: "vm"
            });
        }
    })(lists = app.lists || (app.lists = {}));
})(app || (app = {}));
