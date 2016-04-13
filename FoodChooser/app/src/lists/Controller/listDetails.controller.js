var app;
(function (app) {
    var lists;
    (function (lists) {
        var ListDetailsController = (function () {
            function ListDetailsController(listDataService, $stateParams, foodDataService, $location) {
                this.listDataService = listDataService;
                this.foodDataService = foodDataService;
                this.$location = $location;
                this.getSingleList($stateParams['id']);
                this.getAllFoodFromList($stateParams['id']);
            }
            ListDetailsController.prototype.setToUpdate = function (foodItem) {
                this.currentFood = foodItem;
            };
            ListDetailsController.prototype.showRandomFoodFromList = function () {
                this.allFoods = this.allFoodsBackup;
                if (this.allFoods.length > 1) {
                    var foodToShow = [];
                    var index = Math.floor((Math.random() * this.allFoods.length));
                    foodToShow.push(this.allFoods[index]);
                    this.allFoods = foodToShow;
                }
            };
            ListDetailsController.prototype.togglepublic = function (food) {
                var _this = this;
                food.IsPublic = !food.IsPublic;
                this.foodDataService
                    .UpdateFood(food.Id, food)
                    .then(function (data) {
                    _this.getAllFoodFromList(_this.currentList.Id);
                }, function (response) {
                    console.log(response);
                });
            };
            ListDetailsController.prototype.deleteFood = function (foodId) {
                var _this = this;
                this.foodDataService
                    .DeleteFood(foodId)
                    .then(function (data) {
                    _this.getAllFoodFromList(_this.currentList.Id);
                }, function (response) {
                    console.log(response);
                });
            };
            ListDetailsController.prototype.deleteList = function () {
                var _this = this;
                this.listDataService
                    .DeleteList(this.currentList.Id)
                    .then(function (data) {
                    _this.$location.path('/lists');
                }, function (response) {
                    console.log(response);
                });
            };
            ListDetailsController.prototype.addFood = function () {
                var _this = this;
                if (this.currentFood.Id) {
                    console.log('update');
                    this.foodDataService
                        .UpdateFood(this.currentFood.Id, this.currentFood)
                        .then(function (data) {
                        _this.currentFood = null;
                        _this.getAllFoodFromList(_this.currentList.Id);
                    }, function (response) {
                        console.log(response);
                    });
                }
                else {
                    console.log('insert');
                    this.currentFood.FoodListId = this.currentList.Id;
                    this.foodDataService
                        .AddFood(this.currentFood)
                        .then(function (data) {
                        _this.currentFood = null;
                        _this.getAllFoodFromList(_this.currentList.Id);
                    }, function (response) {
                        console.log(response);
                    });
                }
            };
            ListDetailsController.prototype.getAllFoodFromList = function (listId) {
                var _this = this;
                this.listDataService
                    .GetAllFoodsFromList(listId)
                    .then(function (data) {
                    _this.allFoods = data.data;
                    _this.allFoodsBackup = data.data;
                    for (var i = 0; i < _this.allFoods.length; i++) {
                        var avatarData = {
                            Name: _this.allFoods[i].ItemName + ' ',
                            Avatar: null
                        };
                        _this.allFoods[i].Avatar = avatarData;
                    }
                    console.log('this.allFoods: ' + _this.allFoods);
                }, function (response) {
                    console.log(response);
                });
            };
            ListDetailsController.prototype.inviteUser = function () {
                this.listDataService
                    .InviteUser(this.currentList.Id, this.userToInvite)
                    .then(function (data) {
                    console.log(data);
                }, function (response) {
                    console.log(response);
                });
            };
            ListDetailsController.prototype.getSingleList = function (id) {
                var _this = this;
                this.listDataService
                    .GetSingleList(id)
                    .then(function (data) {
                    _this.currentList = data.data;
                }, function (response) {
                    console.log(response);
                });
            };
            ListDetailsController.$inject = ['listDataService', '$stateParams', 'foodDataService', '$location'];
            return ListDetailsController;
        })();
        angular.module('listsModule')
            .controller('lists.controllers.listDetailsController', ListDetailsController);
    })(lists = app.lists || (app.lists = {}));
})(app || (app = {}));
