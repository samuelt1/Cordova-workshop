window.Notification = Backbone.Model.extend({
  url: 'notifications-collection',
  defaults: {
    'id': 0,
    'title': '',
    'content': '',
    'date': null,
    'is_allow_cancel': true,
    'is_day_or_longer': false,
    'is_business_day': false,
    'url_name': '',
    'url_link': '',
    'is_completed': false,
    'updated_at': null
  }

});

window.Notifications = Backbone.Collection.extend({
  model: Notification,
  localStorage: new Backbone.LocalStorage('notifications-collection'),
  getCollection: function () {
    var collection;

    collection = LocalStorageAdapter.getCollection('notifications-collection');
    return new Notifications(collection);
  },
  getNotification: function (id) {
    var notification;

    notification = LocalStorageAdapter.getJSON('notifications-collection-' + id);
    return new Notification(notification);
  },
  setCollectionIds: function (ids) {
    LocalStorageAdapter.setCollectionIds('notifications-collection', ids);
  },
  clear: function () {
    LocalStorageAdapter.clearCollection('notifications-collection');
    LocalNotificationAdapter.cancelAll();
  },
  cancelNotifications: function (callback) {
    LocalNotificationAdapter.cancelAll(callback);
  },
  scheduleNotifications: function (r_id, surgery_date) {
    var reminderEvents,
            collection,
            scheduleList,
            notifications,
            notification,
            ids = [],
            i,
            date_now,
            date_today,
            date_of_surgery,
            date_to_schedule,
            is_day_or_longer,
            is_business_day,
            day_of_week,
            options_notification = {},
            options_reminder = {},
            reminders = [],
            reminder_settings,
            reminder_info,
            reminder_time,
            jan,
            jul,
            offset,
            time_of_surgery,
            is_static_time,
            app_reminder_time,
            notif_reminder_time,
            datetime_schedule;

    reminder_settings = new ReminderSettingsInfo();
    reminder_info = reminder_settings.getReminderSettingsInfo();

    reminderEvents = new ReminderEvents();
    collection = reminderEvents.getCollection(r_id);
    scheduleList = collection.toJSON();

    notifications = new Notifications();

    date_now = moment();

    for (i = 0; i < scheduleList.length; i++) {
      is_business_day = scheduleList[i].is_business_day;
      is_day_or_longer = scheduleList[i].is_day_or_longer;
      is_static_time = scheduleList[i].is_static_time;
      offset = Math.abs(moment(scheduleList[i].time).utcOffset());

      app_reminder_time = moment(reminder_info.remind_at);
      notif_reminder_time = moment(scheduleList[i].time).add(offset, 'minute');

      if (is_static_time === true) {
        time_of_surgery = notif_reminder_time;
      } else {
        time_of_surgery = app_reminder_time;
      }

      date_today = date_now.startOf('day');
      datetime_schedule = moment(surgery_date).startOf('day');
      datetime_schedule.add(scheduleList[i].day, 'days');
      date_to_schedule = datetime_schedule.startOf('day');
      date_to_schedule.hour(time_of_surgery.hour());
      date_to_schedule.minutes(time_of_surgery.minute());

      options_notification = {
        id: scheduleList[i].id,
        title: scheduleList[i].title,
        content: scheduleList[i].content_html,
        is_allow_cancel: scheduleList[i].is_allow_cancel,
        date: datetime_schedule.toDate(),
        url_name: scheduleList[i].url_name,
        url_link: scheduleList[i].url_link,
        is_completed: false,
        updated_at: date_today
      };

      ids.push(scheduleList[i].id);
      notification = new Notification(options_notification);
      notifications.add(notification);
      notification.save();

      if (date_to_schedule.diff(date_now) > 0) {
        options_reminder = {
          id: scheduleList[i].id,
          time: datetime_schedule.toDate()
        };
        reminders.push(options_reminder);
      }
    }

    console.log('reminders: ' + JSON.stringify(reminders));
    if (LocalNotificationAdapter.isSupported() === true) {
      var junk =LocalNotificationAdapter.scheduleMultiple(reminders);
    }
    
    notifications.setCollectionIds(ids);
    return junk;
  }

});