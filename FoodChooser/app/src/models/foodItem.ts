module app.models {
    export interface IFoodItem {
        Id: number;
        ItemName: string;
        FoodListId: number;
        Avatar: any;
        IsPublic: boolean;
    }

    export class FoodItem implements IFoodItem {

        constructor(
            public Id: number,
            public ItemName: string,
            public FoodListId: number,
            public Avatar: any,
            public IsPublic: boolean
        ) {
             
        }
    }
}