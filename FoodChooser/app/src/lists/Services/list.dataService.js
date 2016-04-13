var app;
(function (app) {
    var lists;
    (function (lists) {
        var ListDataService = (function () {
            function ListDataService($http, appSettings) {
                this.$http = $http;
                this.appSettings = appSettings;
                this.actionUrl = this.appSettings.serverPath + 'api/foodlists/';
            }
            ListDataService.prototype.GetAllLists = function () {
                return this.$http.get(this.actionUrl);
            };
            ListDataService.prototype.GetAllSharedLists = function () {
                return this.$http.get(this.appSettings.serverPath + 'api/SharedFoodLists');
            };
            ListDataService.prototype.GetSingleList = function (id) {
                return this.$http.get(this.actionUrl + id);
            };
            ListDataService.prototype.GetAllFoodsFromList = function (listId) {
                return this.$http.get(this.actionUrl + listId + '/foods');
            };
            ListDataService.prototype.AddList = function (FoodListToAdd) {
                return this.$http.post(this.actionUrl, FoodListToAdd);
            };
            ListDataService.prototype.InviteUser = function (listId, email) {
                return this.$http.get(this.appSettings.serverPath + 'api/SharedFoodLists/' + listId + '/' + email + '/');
            };
            ListDataService.prototype.DeleteList = function (listId) {
                return this.$http.delete(this.actionUrl + listId);
            };
            ListDataService.$inject = ['$http', 'appSettings'];
            return ListDataService;
        })();
        lists.ListDataService = ListDataService;
        angular.module('listsModule')
            .service('listDataService', ListDataService);
    })(lists = app.lists || (app.lists = {}));
})(app || (app = {}));
