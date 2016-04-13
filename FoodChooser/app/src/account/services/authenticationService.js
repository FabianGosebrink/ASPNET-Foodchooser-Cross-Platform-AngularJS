var app;
(function (app) {
    var account;
    (function (account) {
        'use strict';
        var AuthenticationService = (function () {
            function AuthenticationService($http, appSettings) {
                var _this = this;
                this.$http = $http;
                this.appSettings = appSettings;
                this.loginUser = function (username, password) {
                    return _this.$http({
                        method: 'POST',
                        url: _this.actionUrl + 'Token',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        data: 'grant_type=password&username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)
                    });
                };
                this.registerUser = function (username, email, password, confirmPassword) {
                    var registerData = {
                        Email: email,
                        Username: username,
                        Password: password,
                        ConfirmPassword: confirmPassword
                    };
                    return _this.$http.post(_this.actionUrl + 'api/account/register', registerData);
                };
                this.actionUrl = this.appSettings.serverPath;
            }
            AuthenticationService.$inject = ['$http', 'appSettings'];
            return AuthenticationService;
        })();
        angular.module('accountModule').service('authenticationService', AuthenticationService);
    })(account = app.account || (app.account = {}));
})(app || (app = {}));
