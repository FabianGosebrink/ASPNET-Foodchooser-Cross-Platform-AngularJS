var app;
(function (app) {
    var models;
    (function (models) {
        var RegisterUser = (function () {
            function RegisterUser(Username, Email, Password, ConfirmPassword) {
                this.Username = Username;
                this.Email = Email;
                this.Password = Password;
                this.ConfirmPassword = ConfirmPassword;
            }
            return RegisterUser;
        })();
        models.RegisterUser = RegisterUser;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
