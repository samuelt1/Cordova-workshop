window.ReminderSettingsView = Backbone.View.extend({
  initialize: function (attrs) {
    this.model = attrs.model;
  },
  events: {
    'click #btnSave': 'saveReminderSettings',
  },
  serializeData: function () {
    var data = {};

    data.settings = this.model;
    data.title = 'Reminder Settings';
    data.snoozeTimes = this.getSnoozeTimes(data.settings.snooze_time);

    if (data.settings.remind_at) {
      data.remind_at = ApplicationHelper.getNativeTimeString(new Date(data.settings.remind_at));
    }

    data.is_active = data.settings.is_active;
    data.saveText = 'Save';
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  getSnoozeTimes: function (selected) {
    var times = [];

    times.push({name: 'Off', value: 0, selected: selected === 0});
    times.push({name: '5 minutes', value: 5, selected: selected === 5});
    times.push({name: '10 minutes', value: 10, selected: selected === 10});
    times.push({name: '15 minutes', value: 15, selected: selected === 15});
    times.push({name: '30 minutes', value: 30, selected: selected === 30});
    times.push({name: '1 hour', value: 60, selected: selected === 60});

    return times;
  },
  saveReminderSettings: function () {
    var formData,
            surgery_settings,
            surgery_info,
            surgery_date,
            str_date,
            is_active,
            snooze_time,
            now,
            str_surgery_date,
            reminderSettings,
            reminderSettingsInfo,
            notifications,
            callback,
            message,
            errors,
            i;

    notifications = new Notifications();

    str_time = document.getElementById("txtReminderTime").value;
    is_active = $("#btnReminderSwitch").hasClass('active');
    snooze_time = parseInt($("input[name='snooze']:checked").val());
    now = new Date();

    surgery_settings = new SurgeryInfo();
    surgery_info = surgery_settings.getSurgeryInfo();
    reminderSettings = new ReminderSettings();
    reminderSettingsInfo = new ReminderSettingsInfo();

    errors = reminderSettings.validate({remind_at: str_time});

    if (errors) {
      message = 'Errors encountered: \n';
      for (i = 0; i < errors.length; i++) {
        message += ' - ' + errors[i] + '\n';
      }
      console.log(message);
      DialogAdapter.showMessage(message);
    } else {
      console.log('Saving reminder settings info.');

      formData = {
        is_active: is_active,
        snooze_time: snooze_time,
        remind_at: new Date(moment().format('L') + ' ' + str_time),
        updated_at: now
      };

      reminderSettingsInfo.updateReminderSettingsInfo(formData);
      addNotifications = this.addNotifications;
      goToSettings = this.goToSettings;

      if (LocalNotificationAdapter.isSupported() === true && typeof (surgery_info) !== 'undefined') {
        if (formData.is_active === true) {
          this.clearNotifications(function () {
            addNotifications(surgery_info.user, moment(surgery_info.date).format('LL'));
            goToSettings();
          });
        } else {
          this.clearNotifications();
          this.goToSettings();
        }
      } else {
        this.goToSettings();
      }
    }
  },
  addNotifications: function (r_id, surgery_date) {
    var notifications;

    notifications = new Notifications();
    notifications.scheduleNotifications(r_id, moment(surgery_date).format('LL'));
  },
  clearNotifications: function (callback) {
    var notifications;

    notifications = new Notifications();
    notifications.cancelNotifications(callback);
  },
  goToSettings: function () {
    console.log('goToSettings()');
    

    router.navigate('settings', {trigger: true});
  }

});