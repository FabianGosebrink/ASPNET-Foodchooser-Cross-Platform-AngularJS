module app.models {
	export interface IUser {
        UserId: string;
        UserName: string;
        Email: string;
	}

	export class User implements IUser {

		constructor(
            public UserId: string,
			public UserName: string,
            public Email: string
		) {

		}
	}
}