var app;
(function (app) {
    var models;
    (function (models) {
        var User = (function () {
            function User(UserId, UserName, Email) {
                this.UserId = UserId;
                this.UserName = UserName;
                this.Email = Email;
            }
            return User;
        })();
        models.User = User;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
