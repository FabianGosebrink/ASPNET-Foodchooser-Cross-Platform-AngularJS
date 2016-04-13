var app;
(function (app) {
    var common;
    (function (common) {
        var MyStorageService = (function () {
            function MyStorageService() {
            }
            MyStorageService.prototype.SetAuthObject = function (item) {
                localStorage.setItem('auth', JSON.stringify(item));
            };
            MyStorageService.prototype.DeleteAuthObject = function () {
                localStorage.removeItem('auth');
            };
            MyStorageService.prototype.GetToken = function () {
                var item = localStorage.getItem('auth');
                if (item) {
                    var object = JSON.parse(item);
                    if (object && object.data) {
                        return object.data.access_token;
                    }
                }
                return null;
            };
            MyStorageService.prototype.GetStoredData = function () {
                var item = localStorage.getItem('auth');
                if (item) {
                    return item;
                }
                return null;
            };
            MyStorageService.$inject = [];
            return MyStorageService;
        })();
        angular.module('commonModule').service('myStorageService', MyStorageService);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
