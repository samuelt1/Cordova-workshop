window.ReminderSettings = Backbone.Model.extend({
  defaults: {
    'id': 0,
    'is_active': false,
    'snooze_time': null,
    'remind_at': null,
    'updated_at': null
  },
  validate: function (attrs) {
    var invalid = [],
            date_to_check;

    // Checks for valid time field
    if (attrs.remind_at === '') {
      invalid.push('Reminder Time field is required.');
    }

    // Returns invalid field(s)
    if (invalid.length > 0) {
      return invalid;
    }
  }

});

window.ReminderSettingsInfo = Backbone.Collection.extend({
  model: ReminderSettings,
  localStorage: new Backbone.LocalStorage('reminder-settings-info'),
  addReminderSettingsInfo: function () {
    var reminderSettings,
            data = {},
            now,
            remind_at;

    if (this.isSet() === false) {
      now = new Date();
      remind_at = new Date(ApplicationHelper.getDateString(now) + ' 12:00:00 PM');
      data = [{
          id: 1,
          is_active: true,
          snooze_time: 10,
          remind_at: remind_at,
          updated_at: now
        }];

      LocalStorageAdapter.setCollection('reminder-settings-info', data, now.getTime().toString());
      console.log('reminder settings initialized.');
    }
  },
  isSet: function () {
    return typeof (this.getReminderSettingsInfo()) !== 'undefined';
  },
  getReminderSettingsInfo: function () {
    var info;

    info = LocalStorageAdapter.getJSON('reminder-settings-info-1');
    return info;
  },
  updateReminderSettingsInfo: function (data) {
    LocalStorageAdapter.setJSON('reminder-settings-info-1', data);
  }

});