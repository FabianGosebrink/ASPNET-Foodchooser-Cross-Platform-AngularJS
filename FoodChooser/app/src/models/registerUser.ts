module app.models {
    export interface IRegisterUser {
        Username: string;
        Email: string;
        Password: string;
        ConfirmPassword: string;
    }

    export class RegisterUser implements IRegisterUser {

        constructor(
            public Username: string,
            public Email: string,
            public Password: string,
            public ConfirmPassword: string
        ) {

        }
    }
}