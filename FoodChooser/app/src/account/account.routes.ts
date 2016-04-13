module app.home {
    var main = angular.module("accountModule");

    main.config(routeConfig);

    routeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function routeConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider): void {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: "src/account/templates/login.html",
            controller: "account.controllers.accountController",
            controllerAs: "vm"
        }).state('register', {
            url:'/register',
            templateUrl: "src/account/templates/register.html",
            controller: "account.controllers.accountController",
            controllerAs: "vm"
        });
    }
}