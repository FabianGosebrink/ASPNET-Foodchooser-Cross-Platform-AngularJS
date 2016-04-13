module app.home {
	var main = angular.module("homeModule");

	main.config(routeConfig);

    routeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function routeConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider): void {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            controller: "home.controllers.homeController",
            controllerAs: "vm",
            templateUrl: "src/home/Templates/overview.html"
        }).state('about', {
            url:"/about",
            templateUrl: "src/home/Templates/about.html"
        });
    }
}