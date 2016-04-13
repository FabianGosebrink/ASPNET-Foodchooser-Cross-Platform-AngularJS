var app;
(function (app) {
    var models;
    (function (models) {
        var LoginUser = (function () {
            function LoginUser(Username, Password) {
                this.Username = Username;
                this.Password = Password;
            }
            return LoginUser;
        })();
        models.LoginUser = LoginUser;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
