window.Reminder = Backbone.Model.extend({
  url: 'reminder-collection',
  defaults: {
    'id': 0,
    'name': '',
    'order': 0,
    'deleted_at': null,
    'created_at': null,
    'updated_at': null
  }

});

window.Reminders = Backbone.Collection.extend({
  model: Reminder,
  localStorage: new Backbone.LocalStorage('reminders-collection'),
  getCollection: function () {
    var collection;

    collection = LocalStorageAdapter.getCollection('reminders-collection');
    return new Reminders(collection);
  },
  getReminder: function (id) {
    var reminder;

    reminder = LocalStorageAdapter.getJSON('reminders-collection-' + id);
    return new Reminder(reminder);
  },
  isShowAllSet: function () {
    return LocalStorageAdapter.isSet('is_show_all_notifications');
  },
  getShowAll: function () {
    return LocalStorageAdapter.get('is_show_all_notifications');
  },
  setShowAll: function (isShowAll) {
    LocalStorageAdapter.set('is_show_all_notifications', isShowAll);
  }

});
