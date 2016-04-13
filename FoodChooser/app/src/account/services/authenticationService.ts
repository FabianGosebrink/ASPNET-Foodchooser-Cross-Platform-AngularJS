
module app.account {
    'use strict';
    export interface IAuthenticationService {
        loginUser(username: string, password: string): ng.IHttpPromise<any>;
        registerUser(username: string, email: string, password: string, confirmPassword: string): ng.IHttpPromise<any>;
    }

    class AuthenticationService implements IAuthenticationService {

        private actionUrl: string;

        static $inject = ['$http', 'appSettings'];
        constructor(
            private $http: ng.IHttpService,
            private appSettings: any) {

            this.actionUrl = this.appSettings.serverPath;
        }

        loginUser = (username: string, password: string): ng.IHttpPromise<any> => {

            return this.$http({
                method: 'POST',
                url: this.actionUrl + 'Token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: 'grant_type=password&username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password)
            });
        }

        registerUser = (username: string, email: string, password: string, confirmPassword: string): ng.IHttpPromise<any> => {
            var registerData = {
                Email: email,
                Username: username,
                Password: password,
                ConfirmPassword: confirmPassword
            }
            return this.$http.post(this.actionUrl + 'api/account/register', registerData);
        }
    }

    angular.module('accountModule').service('authenticationService', AuthenticationService);
} 