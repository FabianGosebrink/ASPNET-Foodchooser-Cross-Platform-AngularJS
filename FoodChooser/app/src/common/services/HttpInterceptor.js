var app;
(function (app) {
    var common;
    (function (common) {
        var HttpAuthInterceptor = (function () {
            function HttpAuthInterceptor($q, storageService, $location) {
                var _this = this;
                this.$q = $q;
                this.storageService = storageService;
                this.$location = $location;
                this.request = function (config) {
                    config.headers = config.headers || {};
                    var token = _this.storageService.GetToken();
                    if (token) {
                        config.headers['Authorization'] = 'Bearer ' + token;
                    }
                    return config;
                };
                this.responseError = function (rejection) {
                    if (rejection.status === 401 || rejection.status === 403) {
                        _this.storageService.DeleteAuthObject();
                        _this.$location.path('/login');
                    }
                    return _this.$q.reject(rejection);
                };
                this.storageService = storageService;
                this.$q = $q;
            }
            HttpAuthInterceptor.$inject = ['$q', 'myStorageService', '$location'];
            return HttpAuthInterceptor;
        })();
        common.HttpAuthInterceptor = HttpAuthInterceptor;
        angular.module('commonModule').service('httpAuthInterceptor', HttpAuthInterceptor);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
