var app;
(function (app) {
    var foodChooserApp = angular.module('FoodChooserApp', [
        'homeModule',
        'listsModule',
        'accountModule',
        'commonModule',
        'useravatar'])
        .constant('appSettings', {
        serverPath: 'https://newfoodchooser.azurewebsites.net/'
    });
    foodChooserApp.config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('httpAuthInterceptor');
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
            $httpProvider.defaults.headers.common.Pragma = "no-cache";
            $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";
        }]);
})(app || (app = {}));
