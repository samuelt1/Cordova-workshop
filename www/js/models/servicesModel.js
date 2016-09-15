window.Service = Backbone.Model.extend({
  urlRoot: "https://localhost:8443/api/conditions.json",
  defaults: {
    'id': 0,
    'hospital_id': 0,
    'title': "No Title",
    'description': "No Description",
  }

});

window.Services = Backbone.Collection.extend({
  model: Service,
  url: window.Config.SERVER + '/api/services.json',
  localStorage: new Backbone.LocalStorage('services-collection'),
  getServices: function (h_id) {
    var services = LocalStorageAdapter.getCollection('services-collection');
    var result = [];
    
    for (var i = 0; i < services.length; i++) {
      if (services[i].hospital_id === h_id) {
        result.push(services[i]);
      }
    }
    return result;
  },
  getService: function (s_id) {
    var services,
            i;

    services = LocalStorageAdapter.getCollection('services-collection');
    for (i = 0; i < services.length; i++) {
      if (services[i].id === parseInt(s_id)) {
        return services[i];
      }
    }
    return {};
  },
});