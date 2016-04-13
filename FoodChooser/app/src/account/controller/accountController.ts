module app.account {
    interface IAccountController {
        doLoginUser(): void;
        register(): void;
        loginUser: app.models.ILoginUser;
        registerUser: app.models.IRegisterUser;
        successMessage: string;
        errorMessage: string;
        working: boolean;
    }

    class AccountController implements IAccountController {
        loginUser: app.models.ILoginUser;
        registerUser: app.models.IRegisterUser;
        successMessage: string;
        errorMessage: string;
        working: boolean;

        static $inject = ['authenticationService', 'myStorageService', '$location'];
        constructor(private authenticationService: app.account.IAuthenticationService,
            private storageService: app.common.IMyStorageService, private $location: ng.ILocationService) {

        }

        doLoginUser = (): void => {
            this.working = true;
            this.authenticationService
                .loginUser(this.loginUser.Username, this.loginUser.Password)
                .then((data) => {
                    this.storageService.SetAuthObject(data);
                    this.$location.path('/');
                }, (response) => {
                    this.handleError(response);
                }).finally(() => {
                    this.working = false;
                });
        }

        register = (): void => {
            this.working = true;
            this.authenticationService
                .registerUser(
                this.registerUser.Username,
                this.registerUser.Email,
                this.registerUser.Password,
                this.registerUser.ConfirmPassword
                )
                .then((data: any) => {
                    this.successMessage = 'You have been registered. Please login.';
                }, (response: any) => {
                    this.handleError(response);
                }).finally(() => {
                    this.working = false;
                });
        }

        private handleError = (response: any): void => {

            if (response.data.error_description) {
                this.errorMessage = response.data.error_description + '\r\n';
            }

            if (response.Message) {
                this.errorMessage = response.Message + '\r\n';
            }

            if (response.ModelState) {
                var errors: any[];
                for (var key in response.ModelState) {
                    for (var i = 0; i < response.ModelState[key].length; i++) {
                        errors.push(response.ModelState[key][i]);
                        this.errorMessage += response.ModelState[key][i] + '\r\n';
                    }
                }
            }
        }

        private resetMessages = (): void => {
            this.errorMessage = "";
            this.successMessage = "";
        }
    }

    angular.module('accountModule')
        .controller('account.controllers.accountController',
        AccountController);
}
