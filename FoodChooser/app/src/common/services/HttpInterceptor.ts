module app.common {

    export class HttpAuthInterceptor {

        static $inject = ['$q', 'myStorageService', '$location'];
        constructor(private $q, private storageService: app.common.IMyStorageService, private $location: ng.ILocationService) {
            this.storageService = storageService;
            this.$q = $q;
        }

        public request = (config: ng.IRequestConfig) => {
            config.headers = config.headers || {};
            var token = this.storageService.GetToken();
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
                //console.log(config.headers);
            }

            return config;
        }

        public responseError = (rejection) => {
            if (rejection.status === 401 || rejection.status === 403) {
                this.storageService.DeleteAuthObject();
                this.$location.path('/login');
            }
            return this.$q.reject(rejection);
        }


    }

    angular.module('commonModule').service('httpAuthInterceptor', HttpAuthInterceptor);
}