module app.lists {

	interface IFoodDataService {
		DeleteFood(id: number): ng.IHttpPromise<any>;
		UpdateFood(id: number, foodToUpdate: app.models.IFoodItem): ng.IHttpPromise<app.models.IFoodItem>;
		AddFood(FoodToAdd: app.models.IFoodItem): ng.IHttpPromise<app.models.IFoodItem>;
		GetRandomFood(): ng.IHttpPromise<app.models.IFoodItem>;
	}

	export class FoodDataService implements IFoodDataService {
		private actionUrl: string;

		static $inject = ['$http', 'appSettings'];
		constructor(
			private $http: ng.IHttpService,
			private appSettings: any) {

			this.actionUrl = this.appSettings.serverPath + 'api/foods/';
		}

		DeleteFood(id: number): ng.IHttpPromise<any> {
			return this.$http.delete(this.actionUrl + id);
		}

		UpdateFood(id: number, foodToUpdate: app.models.IFoodItem): ng.IHttpPromise<app.models.IFoodItem> {
			return this.$http.put(this.actionUrl + id, foodToUpdate);
		}

		AddFood(FoodToAdd: app.models.IFoodItem): ng.IHttpPromise<app.models.IFoodItem> {
			return this.$http.post(this.actionUrl, FoodToAdd);
		}
		
		GetRandomFood(): ng.IHttpPromise<app.models.IFoodItem>{
			return this.$http.get(this.actionUrl + 'getrandomfood');
		}
	}

	angular.module('listsModule').service('foodDataService', FoodDataService);
}