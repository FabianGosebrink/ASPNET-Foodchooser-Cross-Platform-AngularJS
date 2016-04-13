module app.lists {
    interface IListDetailsController {
        currentFood: app.models.IFoodItem;
        currentList: app.models.IFoodList;
        allFoods: app.models.IFoodItem[];
        userToInvite: string;
        setToUpdate(foodItem: app.models.IFoodItem);
        addFood(): void;
        deleteFood(foodId: number): void;
        inviteUser(): void;
        showRandomFoodFromList(): void;
        deleteList(): void;
    }

    export interface IRouteParams {
        id: number;
    }

    class ListDetailsController implements IListDetailsController {
        currentList: app.models.IFoodList;
        currentFood: app.models.IFoodItem;
        userToInvite: string;
        allFoods: app.models.IFoodItem[];
        allFoodsBackup: app.models.IFoodItem[];

        static $inject = ['listDataService', '$stateParams', 'foodDataService', '$location'];
        constructor(private listDataService: app.lists.ListDataService,
            $stateParams: angular.ui.IStateParamsService,
            private foodDataService: app.lists.FoodDataService, private $location: ng.ILocationService) {

            this.getSingleList($stateParams['id']);
            this.getAllFoodFromList($stateParams['id']);
        }

        setToUpdate(foodItem: app.models.IFoodItem) {
            this.currentFood = foodItem;
        }

        showRandomFoodFromList() {

            this.allFoods = this.allFoodsBackup;

            if (this.allFoods.length > 1) {
                var foodToShow = [];
                var index = Math.floor((Math.random() * this.allFoods.length));
                foodToShow.push(this.allFoods[index]);
                this.allFoods = foodToShow;
            }
        }

        togglepublic(food: app.models.IFoodItem) {
            food.IsPublic = !food.IsPublic;
            this.foodDataService
                .UpdateFood(food.Id, food)
                .then((data) => {
                    this.getAllFoodFromList(this.currentList.Id);
                }, (response) => {
                    console.log(response);
                });
        }

        deleteFood(foodId: number) {
            this.foodDataService
                .DeleteFood(foodId)
                .then((data) => {
                    this.getAllFoodFromList(this.currentList.Id);
                }, (response) => {
                    console.log(response);
                });
        }

        deleteList() {
            this.listDataService
                .DeleteList(this.currentList.Id)
                .then((data) => {
                    this.$location.path('/lists');
                }, (response) => {
                    console.log(response);
                });
        }

        addFood(): void {
            if (this.currentFood.Id) {
                console.log('update');
                this.foodDataService
                    .UpdateFood(this.currentFood.Id, this.currentFood)
                    .then((data) => {
                        this.currentFood = null;
                        this.getAllFoodFromList(this.currentList.Id);
                    }, (response) => {
                        console.log(response);
                    });
            } else {
                console.log('insert');
                this.currentFood.FoodListId = this.currentList.Id;

                this.foodDataService
                    .AddFood(this.currentFood)
                    .then((data) => {
                        this.currentFood = null;
                        this.getAllFoodFromList(this.currentList.Id);
                    }, (response) => {
                        console.log(response);
                    });
            }
        }

        getAllFoodFromList(listId: number) {
            this.listDataService
                .GetAllFoodsFromList(listId)
                .then((data) => {
                    this.allFoods = data.data;
                    this.allFoodsBackup = data.data;

                    for (var i = 0; i < this.allFoods.length; i++) {
                        var avatarData = {
                            Name: this.allFoods[i].ItemName + ' ',
                            Avatar: null
                        };

                        this.allFoods[i].Avatar = avatarData;
                    }

                    console.log('this.allFoods: ' + this.allFoods);
                }, (response) => {
                    console.log(response);
                });
        }

        inviteUser() {
            this.listDataService
                .InviteUser(this.currentList.Id, this.userToInvite)
                .then((data) => {
                    console.log(data);
                }, (response) => {
                    console.log(response);
                });
        }

        getSingleList(id: number): void {
            this.listDataService
                .GetSingleList(id)
                .then((data) => {
                    this.currentList = data.data;
                }, (response) => {
                    console.log(response);
                });
        }
    }

    angular.module('listsModule')
        .controller('lists.controllers.listDetailsController',
        ListDetailsController);
}




