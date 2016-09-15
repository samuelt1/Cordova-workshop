window.DashboardModule = Backbone.Model.extend({
  urlRoot: 'https://localhost:8443/api/dashboard_modules.json',
  defaults: {}

});

window.DashboardModules = Backbone.Collection.extend({
  model: DashboardModule,
  localStorage: new Backbone.LocalStorage('dashboard-modules-collection'),
  collection: [
    {id: 1, key: "timeline", label: "Surgery Timeline", order: 1},
    {id: 2, key: "team", label: "Team", order: 2},
    {id: 3, key: "contact", label: "Contact", order: 3},
    {id: 4, key: "conditions", label: "Conditions", order: 4},
    {id: 5, key: "locations", label: "Nearby", order: 5},
    {id: 6, key: "services", label: "Hospital Services", order: 6},
    {id: 7, key: "virtual-reality", label: "Virtual Reality", order: 7},
    {id: 8, key: "website", label: "Full Website", order: 8},
  ],
  getCollection: function () {

    return this.collection;
  }

});