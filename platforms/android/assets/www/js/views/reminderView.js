window.ReminderView = Backbone.View.extend({
  initialize: function (attrs, isReadOnly) {
    this.id = attrs.id;
    this.isReadOnly = isReadOnly;
  },
  events: {
    'click #btnOk': 'hide',
    'click #btnSnooze': 'snooze',
    'click #lnkClose': 'hide',
    'click .external-url': 'openExternalUrl'
  },
  serializeData: function () {
    var data = {},
            reminderSettingsInfo,
            reminderInfo,
            notifications,
            notification;

    reminderSettingsInfo = new ReminderSettingsInfo();
    reminderSettingsInfo.fetch();

    reminderInfo = reminderSettingsInfo.getReminderSettingsInfo();

    notifications = new Notifications();
    notification = notifications.getNotification(this.id).toJSON();

    data.header = Config.APP_NAME;
    data.title = notification.title;
    data.content = notification.content;
    data.url_name = notification.url_link;
    data.url_link = notification.url_link;
    data.is_show_snooze = !(this.isReadOnly === true || parseInt(reminderInfo.snooze_time) === 0);
    return data;
  },
  render: function () {
    $(this.el).append(this.template(this.serializeData()));
    return this;
  },
  show: function (options) {
    $('#header').append(this.render().el);
  },
  hide: function () {
    this.render().el.remove();
    console.log('current:' + Backbone.history.getFragment());
    this.refreshNotifications();
  },
  snooze: function () {
    var now,
            reminderSettingsInfo,
            reminderInfo,
            snooze_time,
            time_to_snooze;

    reminderSettingsInfo = new ReminderSettingsInfo();
    reminderSettingsInfo.fetch();

    reminderInfo = reminderSettingsInfo.getReminderSettingsInfo();

    now = new Date();
    snooze_time = reminderInfo.snooze_time;
    time_to_snooze = new Date(now.getTime() + snooze_time * 60 * 1000);
    LocalNotificationAdapter.schedule({id: this.id, time: time_to_snooze});
    console.log('snoozing local notification ' + this.id + ' for ' + snooze_time + ' minutes.');
    this.refreshNotifications();
    this.hide();
  },
  refreshNotifications: function () {
    if (Backbone.history.getFragment() === "notifications") {
      window.router.notificationsView.render();
    }
  },
  openExternalUrl: function () {
    console.log('opening: ' + this.url_link);
    window.open('http://' + this.url_link, "_system");
  }

});