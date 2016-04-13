module app.lists {
    export interface IListDataService {
		GetAllLists(): ng.IHttpPromise<app.models.IFoodList[]>;
		GetAllSharedLists(): ng.IHttpPromise<app.models.IFoodList[]>;
		GetSingleList(id: number): ng.IHttpPromise<app.models.IFoodList>;
		AddList(FoodListToAdd: app.models.IFoodList): ng.IHttpPromise<app.models.IFoodList>;
		GetAllFoodsFromList(listId: number): ng.IHttpPromise<app.models.IFoodItem[]>;
		InviteUser(listId: number, email: string): ng.IHttpPromise<any>;
		DeleteList(listId: number): ng.IHttpPromise<any>;
	}

	export class ListDataService implements IListDataService {
		private actionUrl: string;

		static $inject = ['$http', 'appSettings'];
		constructor(
			private $http: ng.IHttpService,
			private appSettings: any) {

			this.actionUrl = this.appSettings.serverPath + 'api/foodlists/';
		}

		GetAllLists(): ng.IHttpPromise<app.models.IFoodList[]> {
			return this.$http.get(this.actionUrl);
		}

		GetAllSharedLists(): ng.IHttpPromise<app.models.IFoodList[]> {
			return this.$http.get(this.appSettings.serverPath + 'api/SharedFoodLists');
		}

		GetSingleList(id: number): ng.IHttpPromise<app.models.IFoodList> {
			return this.$http.get(this.actionUrl + id);
		}

		GetAllFoodsFromList(listId: number): ng.IHttpPromise<app.models.IFoodItem[]> {
			return this.$http.get(this.actionUrl + listId + '/foods');
		}

		AddList(FoodListToAdd: app.models.IFoodList): ng.IHttpPromise<app.models.IFoodList> {
			return this.$http.post(this.actionUrl, FoodListToAdd);
		}

		InviteUser(listId: number, email: string): ng.IHttpPromise<any> {
			return this.$http.get(this.appSettings.serverPath + 'api/SharedFoodLists/' + listId + '/' + email + '/');
		}

		DeleteList(listId: number): ng.IHttpPromise<any> {
			return this.$http.delete(this.actionUrl + listId);
		}
	}

	angular.module('listsModule')
		.service('listDataService', ListDataService);
}