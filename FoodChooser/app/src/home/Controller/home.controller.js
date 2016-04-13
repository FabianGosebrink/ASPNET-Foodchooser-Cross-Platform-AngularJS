var app;
(function (app) {
    var home;
    (function (home) {
        var HomeController = (function () {
            function HomeController(foodDataService, window) {
                var _this = this;
                this.foodDataService = foodDataService;
                this.window = window;
                setTimeout(function () { return _this.getRandomFood(); }, 1000);
            }
            HomeController.prototype.getRandomFood = function () {
                var _this = this;
                this.ErrorMessage = null;
                this.RandomFood = null;
                this.foodDataService
                    .GetRandomFood()
                    .success(function (data) {
                    _this.RandomFood = data;
                })
                    .error(function (response) {
                    _this.ErrorMessage = 'No food found :-(';
                });
            };
            HomeController.prototype.getRecipesWithGoogle = function () {
                window.open('https://www.google.de/search?q=' + this.RandomFood.ItemName, '_blank');
            };
            HomeController.prototype.getRecipesWithBing = function () {
                window.open('https://www.bing.com/search?q=' + this.RandomFood.ItemName, '_blank');
            };
            HomeController.$inject = ['foodDataService'];
            return HomeController;
        })();
        angular.module('homeModule')
            .controller('home.controllers.homeController', HomeController);
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
