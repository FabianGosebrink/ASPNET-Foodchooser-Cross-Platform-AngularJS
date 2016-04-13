var app;
(function (app) {
    var account;
    (function (account) {
        var AccountController = (function () {
            function AccountController(authenticationService, storageService, $location) {
                var _this = this;
                this.authenticationService = authenticationService;
                this.storageService = storageService;
                this.$location = $location;
                this.doLoginUser = function () {
                    _this.working = true;
                    _this.authenticationService
                        .loginUser(_this.loginUser.Username, _this.loginUser.Password)
                        .then(function (data) {
                        _this.storageService.SetAuthObject(data);
                        _this.$location.path('/');
                    }, function (response) {
                        _this.handleError(response);
                    }).finally(function () {
                        _this.working = false;
                    });
                };
                this.register = function () {
                    _this.working = true;
                    _this.authenticationService
                        .registerUser(_this.registerUser.Username, _this.registerUser.Email, _this.registerUser.Password, _this.registerUser.ConfirmPassword)
                        .then(function (data) {
                        _this.successMessage = 'You have been registered. Please login.';
                    }, function (response) {
                        _this.handleError(response);
                    }).finally(function () {
                        _this.working = false;
                    });
                };
                this.handleError = function (response) {
                    if (response.data.error_description) {
                        _this.errorMessage = response.data.error_description + '\r\n';
                    }
                    if (response.Message) {
                        _this.errorMessage = response.Message + '\r\n';
                    }
                    if (response.ModelState) {
                        var errors;
                        for (var key in response.ModelState) {
                            for (var i = 0; i < response.ModelState[key].length; i++) {
                                errors.push(response.ModelState[key][i]);
                                _this.errorMessage += response.ModelState[key][i] + '\r\n';
                            }
                        }
                    }
                };
                this.resetMessages = function () {
                    _this.errorMessage = "";
                    _this.successMessage = "";
                };
            }
            AccountController.$inject = ['authenticationService', 'myStorageService', '$location'];
            return AccountController;
        })();
        angular.module('accountModule')
            .controller('account.controllers.accountController', AccountController);
    })(account = app.account || (app.account = {}));
})(app || (app = {}));
