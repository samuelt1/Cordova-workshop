window.CareProviderRole = Backbone.Model.extend({
  urlRoot: '/api/team/care_provider_roles.json',
  defaults: {
    'id': 0,
    'order': '',
    'name': '',
    'description_html': '',
    'updated_at': null
  }

});

window.CareProviderRoles = Backbone.Collection.extend({
  model: CareProviderRole,
  localStorage: new Backbone.LocalStorage('care-provider-roles-collection'),
  getCollection: function () {
    var collection;

    collection = LocalStorageAdapter.getCollection('care-provider-roles-collection');
    return new CareProviderRoles(collection);
  },
  getCareProviderRole: function (id) {
    var careProviderRole;

    careProviderRole = LocalStorageAdapter.getJSON('care-provider-roles-collection-' + id);
    return new CareProviderRole(careProviderRole);
  }

});