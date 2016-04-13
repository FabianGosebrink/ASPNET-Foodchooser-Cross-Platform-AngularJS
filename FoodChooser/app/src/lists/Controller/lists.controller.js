var app;
(function (app) {
    var lists;
    (function (lists) {
        var ListController = (function () {
            function ListController(listDataService) {
                this.listDataService = listDataService;
                this.getAllLists();
                this.getAllSharedLists();
            }
            ListController.prototype.addList = function () {
                var _this = this;
                this.listDataService
                    .AddList(this.newList)
                    .then(function (data) {
                    _this.newList = null;
                    _this.getAllLists();
                }, function (response) {
                    console.log(response);
                });
            };
            ListController.prototype.getAllLists = function () {
                var _this = this;
                this.listDataService
                    .GetAllLists()
                    .then(function (response) {
                    _this.allLists = response.data;
                    console.log(_this.allLists);
                }, function (response) {
                    console.log(response);
                });
            };
            ListController.prototype.getAllSharedLists = function () {
                var _this = this;
                this.listDataService
                    .GetAllSharedLists()
                    .then(function (response) {
                    _this.allSharedLists = response.data;
                    console.log(_this.allSharedLists);
                }, function (response) {
                    console.log(response);
                });
            };
            ListController.$inject = ['listDataService'];
            return ListController;
        })();
        angular.module('listsModule')
            .controller('lists.controllers.listController', ListController);
    })(lists = app.lists || (app.lists = {}));
})(app || (app = {}));
