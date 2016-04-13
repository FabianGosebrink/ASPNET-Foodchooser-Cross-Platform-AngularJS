module app.common {


    export interface IMyStorageService {
        SetAuthObject(item: any): void;
        DeleteAuthObject():void;
        GetToken(): string;
        GetStoredData(): any;
    }

    class MyStorageService implements IMyStorageService {

        static $inject = [];

        public SetAuthObject(item: any): void {
            localStorage.setItem('auth', JSON.stringify(item));
        }

        public DeleteAuthObject(): void {
            localStorage.removeItem('auth');
        }

        public GetToken(): string {
            var item = localStorage.getItem('auth');
            if (item) {
                var object = JSON.parse(item);
                if (object && object.data) {
                    return object.data.access_token;
                }

            }
            return null;
        }

        public GetStoredData(): any {
            var item = localStorage.getItem('auth');
            if (item) {
                return item;
            }
            return null;
        }
    }

    angular.module('commonModule').service('myStorageService', MyStorageService);
} 