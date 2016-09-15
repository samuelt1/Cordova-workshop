window.ReminderType = Backbone.Model.extend({
  url: 'reminder-types-collection',
  defaults: {
    'id': 0,
    'name': '',
    'updated_at': null
  }

});

window.ReminderTypes = Backbone.Collection.extend({
  model: ReminderType,
  localStorage: new Backbone.LocalStorage('reminder-types-collection')

});