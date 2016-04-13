module app.lists {
	var listsModule = angular.module("listsModule");

	listsModule.config(routeConfig);

    routeConfig.$inject = ["$stateProvider", "$urlRouterProvider"];

    function routeConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider): void {

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
}