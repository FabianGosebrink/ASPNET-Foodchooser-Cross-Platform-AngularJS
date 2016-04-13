var app;
(function (app) {
    var home;
    (function (home) {
        var NavigationController = (function () {
            function NavigationController(currentUser, storageService, $location) {
                this.currentUser = currentUser;
                this.storageService = storageService;
                this.$location = $location;
                console.log(this.currentUser
                    .isLoggedIn());
            }
            NavigationController.prototype.IsLoggedIn = function () {
                return this.currentUser
                    .isLoggedIn();
            };
            NavigationController.prototype.LogOut = function () {
                this.storageService.DeleteAuthObject();
                console.log('logged out');
                this.$location.path('/');
            };
            NavigationController.$inject = ['currentUser', 'myStorageService', '$location'];
            return NavigationController;
        })();
        angular.module('homeModule')
            .controller('navigationController', NavigationController);
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
