module app.home {
    interface INavigationController {
        IsLoggedIn(): boolean;
        LogOut(): void;
    }

    class NavigationController implements INavigationController {

        static $inject = ['currentUser', 'myStorageService', '$location'];
        constructor(private currentUser: app.common.ICurrentUser, private storageService: app.common.IMyStorageService, private $location: ng.ILocationService) {
            console.log(this.currentUser
                .isLoggedIn());
        }

        IsLoggedIn(): boolean {
            return this.currentUser
                .isLoggedIn();
        }

        LogOut(): void {
            this.storageService.DeleteAuthObject();
            console.log('logged out');
            this.$location.path('/');
        }
    }

    angular.module('homeModule')
        .controller('navigationController',
        NavigationController);
}
