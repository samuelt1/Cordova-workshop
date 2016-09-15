window.ReminderEvent = Backbone.Model.extend({
  urlRoot: 'https://localhost:8443/api/reminder/1/events.json',
  defaults: {
    'id': 0,
    'reminder_id': 0,
    'timeline_id': 0,
    'day': 0,
    'time': null,
    'is_allow_cancel': true,
    'is_static_time': false,
    'is_time_or_longer': false,
    'is_business_day': false,
    'title': '',
    'content': '',
    'updated_at': null
  }

});

window.ReminderEvents = Backbone.Collection.extend({
  model: ReminderEvent,
  localStorage: new Backbone.LocalStorage('reminder-events-collection'),
  getCollection: function (r_id) {
    var collection;

    switch (parseInt(r_id)) {
      case 1:
        collection = LocalStorageAdapter.getCollection('reminder-events-patient-collection');
        break;
      case 2:
        collection = LocalStorageAdapter.getCollection('reminder-events-parent-collection');
        break;
      case 3:
        collection = LocalStorageAdapter.getCollection('reminder-events-other-collection');
        break;
      default:
        collection = LocalStorageAdapter.getCollection('reminder-events-patient-collection');
        break;
    }

    var surgeryInfo = new SurgeryInfo();
    var timeline = surgeryInfo.getSurgeryInfo().surgery;
    var timelineSpecificCollection = _.filter(collection, function (reminderEvent) {
      return reminderEvent.timeline_id === timeline;
    });

    return new ReminderEvents(timelineSpecificCollection);
  }

});