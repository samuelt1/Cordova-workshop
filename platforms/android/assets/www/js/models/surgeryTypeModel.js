window.SurgeryType = Backbone.Model.extend({
  url: 'surgery-types-collection',
  defaults: {
    'id': 0,
    'name': '',
    'updated_at': null
  }

});

window.SurgeryTypes = Backbone.Collection.extend({
  model: SurgeryType,
  localStorage: new Backbone.LocalStorage('surgery-types-collection'),
  getCollection: function () {
    var collection;

    collection = LocalStorageAdapter.getCollection('surgery-types-collection');
    return new SurgeryTypes(collection);
  },
  getSurgeryType: function (id) {
    var surgeryType;

    surgeryType = LocalStorageAdapter.getJSON('surgery-types-collection-' + id);
    return new SurgeryType(surgeryType);
  }

});