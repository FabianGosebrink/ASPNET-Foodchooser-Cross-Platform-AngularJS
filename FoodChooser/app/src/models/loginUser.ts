module app.models {
	export interface ILoginUser {
		Username: string;
		Password: string;
	}

	export class LoginUser implements ILoginUser {

		constructor(
			public Username: string,
			public Password: string
		) {

		}
	}
}