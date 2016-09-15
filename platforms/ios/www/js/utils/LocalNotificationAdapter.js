window.LocalNotificationAdapter = {
  initialize: function () {},
  /**
   * Checks if Local Notifications are supported.
   * 
   * @return {Bool} - Boolean for local notifications support
   * 
   */
  isSupported: function () {
    var isAvailable;

    isAvailable = typeof (cordova) !== 'undefined' && typeof (cordova.plugins.notification.local) !== 'undefined';
    if (isAvailable === false) {
      console.log('Local Notifications are not supported.');
    }
    return isAvailable;
  },
  requestPermission: function () {
    if (this.isSupported()) {
      cordova.plugins.notification.local.hasPermission(function (granted) {
        console.log('has permission: ' + granted);
        if (granted === false) {
          cordova.plugins.notification.local.registerPermission(function (allowed) {
            console.log('register permission: ' + allowed);
            if (allowed === true) {
              console.log('local notification permission allowed.');
            } else {
              console.log('local notification permission denied.');
            }
          })
        }
      });
    }
  },
  schedule: function (options) {
    var sound;

    if (this.isSupported()) {
      sound = ApplicationHelper.isAndroid() === true ? 'file://sound.mp3' : 'file://beep.caf';
      cordova.plugins.notification.local.schedule({
        id: options.id,
        title: Config.APP_NAME,
        text: 'You have a reminder!',
        at: options.time,
        sound: sound
      });
      console.log('Scheduled local notification ' + options.id + ' with options: ' + JSON.stringify(options));
    }
  },
  scheduleMultiple: function (optionsArray) {
    var sound,
            notifications = [],
            notification,
            i;

    if (this.isSupported()) {
      sound = ApplicationHelper.isAndroid() === true ? 'file://sound.mp3' : 'file://beep.caf';
      for (i = 0; i < optionsArray.length; i++) {
        notification = {
          id: optionsArray[i].id,
          title: Config.APP_NAME,
          text: 'You have a reminder!',
          at: optionsArray[i].time,
          sound: sound
        };
        notifications.push(notification);
      }
      cordova.plugins.notification.local.schedule(notifications, function () {
        console.log('Scheduled location notifications: ' + JSON.stringify(notifications));
      });
      var temp=[];
      for(var i =0; i< 100;i++){
        temp[i] = i*2;
      }
      return temp;
    }
  },
  clear: function (callback) {
    if (this.isSupported()) {
      cordova.plugins.notification.local.clearAll(function () {
        if (callback) {
          callback();
        }
      });
    }
  },
  /**
   * Cancels a scheduled local notification with the provided ID.
   * 
   * @param {String} id - Local Notification ID
   *
   */
  cancel: function (id) {
    console.log('Cancelling local notification ' + id + '.');
    // Checks if Local Notifications are supported
    if (this.isSupported()) {
      cordova.plugins.notification.local.cancel(id);
      console.log('Cancelled local notification ' + id + '.');
    }
  },
  /**
   * Cancels all scheduled local notifications.
   * 
   */
  cancelAll: function (callback) {
    console.log('Cancelling all local notifications');
    // Checks if Local Notifications are supported
    if (this.isSupported()) {
      cordova.plugins.notification.local.cancelAll(callback);
      console.log('Cancelled all local notifications');
    }
  }

};