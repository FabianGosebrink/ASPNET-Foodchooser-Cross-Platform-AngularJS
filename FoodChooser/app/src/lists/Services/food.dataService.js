var app;
(function (app) {
    var lists;
    (function (lists) {
        var FoodDataService = (function () {
            function FoodDataService($http, appSettings) {
                this.$http = $http;
                this.appSettings = appSettings;
                this.actionUrl = this.appSettings.serverPath + 'api/foods/';
            }
            FoodDataService.prototype.DeleteFood = function (id) {
                return this.$http.delete(this.actionUrl + id);
            };
            FoodDataService.prototype.UpdateFood = function (id, foodToUpdate) {
                return this.$http.put(this.actionUrl + id, foodToUpdate);
            };
            FoodDataService.prototype.AddFood = function (FoodToAdd) {
                return this.$http.post(this.actionUrl, FoodToAdd);
            };
            FoodDataService.prototype.GetRandomFood = function () {
                return this.$http.get(this.actionUrl + 'getrandomfood');
            };
            FoodDataService.$inject = ['$http', 'appSettings'];
            return FoodDataService;
        })();
        lists.FoodDataService = FoodDataService;
        angular.module('listsModule').service('foodDataService', FoodDataService);
    })(lists = app.lists || (app.lists = {}));
})(app || (app = {}));
