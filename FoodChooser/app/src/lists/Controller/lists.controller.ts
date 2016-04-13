module app.lists {
    interface IListController {

        newList: app.models.IFoodList;
        allLists: app.models.IFoodList[];
        allSharedLists: app.models.IFoodList[];
        addList(): void;
    }

    class ListController implements IListController {
        newList: app.models.IFoodList;
        allLists: app.models.IFoodList[];
        allSharedLists: app.models.IFoodList[];

        static $inject = ['listDataService'];
        constructor(private listDataService: app.lists.ListDataService) {
            this.getAllLists();
            this.getAllSharedLists();
        }

        addList(): void {
            this.listDataService
                .AddList(this.newList)
                .then((data) => {
                    this.newList = null;
                    this.getAllLists();
                }, (response) => {
                    console.log(response);
                });
        }

        getAllLists(): void {
            this.listDataService
                .GetAllLists()
                .then((response: any) => {
                    this.allLists = response.data;
                    console.log(this.allLists);
                }, (response) => {
                    console.log(response);
                });
        }

        getAllSharedLists(): void {
            this.listDataService
                .GetAllSharedLists()
                .then((response: any) => {
                    this.allSharedLists = response.data;
                    console.log(this.allSharedLists);
                }, (response) => {
                    console.log(response);
                });
        }
    }

    angular.module('listsModule')
        .controller('lists.controllers.listController',
        ListController);
}




