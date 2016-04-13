module app.models {
	export interface IFoodList {
		Id: number;
		Name: string;
		UserId: number;
		FoodItems: models.IFoodItem[];
	}

	export class FoodList implements IFoodList {

		constructor(
			public Id: number,
			public Name: string,
			public UserId: number,
			public FoodItems: app.models.IFoodItem[]
		) {

		}
	}
}