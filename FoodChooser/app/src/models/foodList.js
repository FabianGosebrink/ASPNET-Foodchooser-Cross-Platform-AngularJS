var app;
(function (app) {
    var models;
    (function (models) {
        var FoodList = (function () {
            function FoodList(Id, Name, UserId, FoodItems) {
                this.Id = Id;
                this.Name = Name;
                this.UserId = UserId;
                this.FoodItems = FoodItems;
            }
            return FoodList;
        })();
        models.FoodList = FoodList;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
