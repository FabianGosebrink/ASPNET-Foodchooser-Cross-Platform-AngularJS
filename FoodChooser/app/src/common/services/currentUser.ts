module app.common {
    export interface ICurrentUser {
        getUser(): app.models.IUser;
        isLoggedIn(): boolean;
    }
    
    class CurrentUser implements ICurrentUser {

        static $inject = ["myStorageService"];
        constructor(
            private storageService: app.common.IMyStorageService) {
        }

        isLoggedIn(): boolean {
            var storedData = this.storageService.GetStoredData();
            return storedData != null;
        }

        getUser(): app.models.IUser {
            var storedData = this.storageService.GetStoredData();

            if (!storedData) {
                return null;
            }

            var user = new app.models.User(storedData.userName, storedData.userName, storedData.email);
            return user;
        }
    }

    angular.module('commonModule').service('currentUser', CurrentUser);
} 