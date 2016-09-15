window.LocationCategory = Backbone.Model.extend({
  rootUrl: '/api/locations/categories.json',
  defaults: {
    'id': '',
    'name': ''
  }

});

window.LocationCategories = Backbone.Collection.extend({
  model: LocationCategory,
  url: 'location-categories',
  collection: [
    {"id": "bank", "name": "Banks", "keyword": "banks"},
    {"id": "cafe", "name": "Coffee Shops", "keyword": "coffee shops"},
    {"id": "restaurant", "name": "Restaurants", "keyword": "restaurants"},
    {"id": "florist", "name": "Flower Shops", "keyword": "flower shops"},
    {"id": "gas_station", "name": "Gas Stations", "keyword": "gas stations"},
    {"id": "lodging", "name": "Hotels", "keyword": "hotels"},
    {"id": "grocery_or_supermarket", "name": "Supermarkets", "keyword": "supermarkets"}
  ],
  getCategory: function (c_id) {
    var categories,
            i;

    categories = this.collection;
    for (i = 0; i < categories.length; i++) {
      if (categories[i].id === c_id.toString()) {
        return categories[i];
      }
    }
    return {};
  }

});