module app.home {
	interface IHomeController {
		RandomFood: app.models.IFoodItem;
		ErrorMessage: string;
		getRandomFood(): void;
		getRecipesWithGoogle():void;
		getRecipesWithBing():void;
	}

	class HomeController implements IHomeController {

		RandomFood: app.models.IFoodItem;
		ErrorMessage: string;

		static $inject = ['foodDataService'];
		constructor(private foodDataService: app.lists.FoodDataService, private window: angular.IWindowService) {
			setTimeout(() => this.getRandomFood(), 1000);
		}

		getRandomFood(): void {

			this.ErrorMessage = null;
			this.RandomFood = null;

			this.foodDataService
				.GetRandomFood()
				.success((data: app.models.IFoodItem) => {
					this.RandomFood = data;
				})
				.error((response) => {
					this.ErrorMessage = 'No food found :-(';
				});
		}

		getRecipesWithGoogle(): void {
			window.open('https://www.google.de/search?q=' + this.RandomFood.ItemName, '_blank');
		}

		getRecipesWithBing(): void {
			window.open('https://www.bing.com/search?q=' + this.RandomFood.ItemName, '_blank');
		}
	}

	angular.module('homeModule')
		.controller('home.controllers.homeController',
		HomeController);
}
