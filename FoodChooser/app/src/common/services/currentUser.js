var app;
(function (app) {
    var common;
    (function (common) {
        var CurrentUser = (function () {
            function CurrentUser(storageService) {
                this.storageService = storageService;
            }
            CurrentUser.prototype.isLoggedIn = function () {
                var storedData = this.storageService.GetStoredData();
                return storedData != null;
            };
            CurrentUser.prototype.getUser = function () {
                var storedData = this.storageService.GetStoredData();
                if (!storedData) {
                    return null;
                }
                var user = new app.models.User(storedData.userName, storedData.userName, storedData.email);
                return user;
            };
            CurrentUser.$inject = ["myStorageService"];
            return CurrentUser;
        })();
        angular.module('commonModule').service('currentUser', CurrentUser);
    })(common = app.common || (app.common = {}));
})(app || (app = {}));
