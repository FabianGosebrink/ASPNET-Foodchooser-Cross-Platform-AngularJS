module app {
    var foodChooserApp = angular.module('FoodChooserApp',
        [
            'homeModule',
            'listsModule',
            'accountModule',
            'commonModule',
            'useravatar'])
        .constant('appSettings', {
            serverPath: 'http://localhost:9072/' 
        });

    foodChooserApp.config(['$httpProvider', ($httpProvider: ng.IHttpProvider) => {
        $httpProvider.interceptors.push('httpAuthInterceptor');

        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
        $httpProvider.defaults.headers.common.Pragma = "no-cache";
        $httpProvider.defaults.headers.common["If-Modified-Since"] = "0"; 
    }]);
}