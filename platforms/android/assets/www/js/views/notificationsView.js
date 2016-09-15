window.NotificationsView = Backbone.View.extend({
  initialize: function (attrs) {
    this.collection = attrs.collection || [];
    this.filtered = attrs.collection || [];
    this.show_completed = LocalStorageAdapter.getJSON("show_completed");
  },
  serializeData: function () {
    var data = {},
            reminder_settings,
            reminder_info;

    reminder_settings = new ReminderSettingsInfo();
    reminder_info = reminder_settings.getReminderSettingsInfo();

    data.title = 'Notifications';
    data.emptyText = 'No notifications found.';
    data.toggleText = this.show_completed === true ? 'Hide Completed' : 'Show Completed';
    data.notificationsArr = _.sortBy(this.getNotifications(), 'date');
    data.is_show_active_toggle = typeof (reminder_info) !== 'undefined';
    data.is_active = reminder_info.is_active;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  events: {
    'toggle #btnOnOff': 'toggleOnOff',
    'click .css-checkbox': 'toggleNotification',
    'click #btnToggleCompleted': 'toggleCompleted',
    'click .notification-details': 'showDetails'
  },
  toggleOnOff: function () {
    var is_reminder_on,
            notifications,
            reminder_settings,
            reminder_info,
            surgeries,
            surgery_info,
            surgery_date,
            str_surgery_date;

    is_reminder_on = $('#btnOnOff').hasClass('active') === true;
    notifications = new Notifications();
    surgeries = new SurgeryInfo();
    surgery_info = surgeries.getSurgeryInfo();
    reminder_settings = new ReminderSettingsInfo();
    reminder_info = reminder_settings.getReminderSettingsInfo();

    if (is_reminder_on === true) {
      if (typeof (surgery_info) !== 'undefined') {
        surgery_date = moment(surgery_info.date).format('LL');
        notifications.scheduleNotifications(surgery_info.user, surgery_date);
      }
      reminder_info.is_active = true;
    } else {
      notifications.cancelNotifications();
      reminder_info.is_active = false;
    }

    reminder_settings.updateReminderSettingsInfo(reminder_info);
  },
  toggleNotification: function (e) {
    var id,
            notifications = [],
            notification,
            notification_date,
            date_updated,
            reminder,
            options;

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    date_updated = new Date();

    notifications = this.show_completed === true ? this.collection : this.filtered;
    notification = _.findWhere(notifications, {id: id});
    notification.is_completed = !notification.is_completed;
    notification.updated_at = date_updated;

    reminder = new Notification();

    notification_date = new Date(notification.date);
    if (notification_date > date_updated) {
      if (notification.is_completed === true) {
        if (notification.is_allow_cancel === true) {
          LocalNotificationAdapter.cancel(id);
        } else {
          console.log('local notification cannot be cancelled.')
        }
      } else {
        options = {
          id: id,
          time: notification_date
        }
        LocalNotificationAdapter.schedule(options);
      }
    }

    LocalStorageAdapter.setJSON('notifications-collection-' + id, notification);
    this.filtered = notifications;
    this.render();
    CounterAdapter.updateCounter();
  },
  toggleCompleted: function () {
    var collection,
            filtered = [],
            i;

    if (this.show_completed === true) {
      this.show_completed = false;
      LocalStorageAdapter.set("show_completed", false);
      for (i = 0; i < this.collection.length; i++) {
        if (this.collection[i].is_completed === false) {
          filtered.push(this.collection[i]);
        }
      }
      this.filtered = filtered;
    } else {
      this.show_completed = true;
      LocalStorageAdapter.set("show_completed", true);
      this.filtered = this.collection;
    }
    this.render();
  },
  showDetails: function (e) {
    var id;

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    reminderView = new ReminderView({id: id}, true);
    reminderView.show();

  },
  getNotifications: function () {
    var collection,
            filtered = [],
            i;

    if (!this.show_completed) {
      this.show_completed = false;
      LocalStorageAdapter.set("show_completed", false);
      for (i = 0; i < this.collection.length; i++) {
        if (this.collection[i].is_completed === false) {
          filtered.push(this.collection[i]);
        }
      }
      this.filtered = filtered;
    }
    return this.filtered;
  }

});