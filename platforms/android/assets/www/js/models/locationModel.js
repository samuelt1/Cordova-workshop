window.Location = Backbone.Model.extend({
});

window.Locations = Backbone.Collection.extend({
  model: Location,
  initialize: function (attrs) {
    this.hospital_id = attrs.hospital_id;
    this.category_id = attrs.category_id;
  },
  getLocations: function (successCallback, context) {
    var location,
            types,
            callback;

    location = parseInt(this.hospital_id) === 1 ? Config.FACILITIES.LOCATIONS[0] : Config.FACILITIES.LOCATIONS[1];
    types = [this.category_id];
    ServiceAdapter.getLocationsByCategory(location, types, function (results) {
      if (successCallback) {
        callback = successCallback.bind(context);
        callback(results);
      }
    });
  }

});