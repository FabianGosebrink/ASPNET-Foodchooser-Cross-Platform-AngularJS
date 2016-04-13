var app;
(function (app) {
    var models;
    (function (models) {
        var FoodItem = (function () {
            function FoodItem(Id, ItemName, FoodListId, Avatar, IsPublic) {
                this.Id = Id;
                this.ItemName = ItemName;
                this.FoodListId = FoodListId;
                this.Avatar = Avatar;
                this.IsPublic = IsPublic;
            }
            return FoodItem;
        })();
        models.FoodItem = FoodItem;
    })(models = app.models || (app.models = {}));
})(app || (app = {}));
