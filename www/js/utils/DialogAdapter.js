window.DialogAdapter = {
  initialize: function () {},
  /**
   * Checks if Device is supported.
   * 
   * @return {Bool} - Boolean for notifications support
   * 
   */
  isSupported: function () {
    var isAvailable;

    isAvailable = typeof navigator.notification !== 'undefined';

    if (isAvailable === false) {
      console.log('Dialog is not supported.');
    }

    return isAvailable;
  },
  /**
   * Invokes callback if dialog is not supported.
   * 
   * @param {Function} callback - Callback function
   * @param {Object} args (Optional) - Function call parameters
   * 
   */
  invoke: function (callback, args) {
    if (callback && typeof callback === 'function') {
      callback(args);
    }
  },
  /**
   * Displays message dialog.
   * 
   * @param {String} message - Message to display
   * @param {Function} callback (Optional) - Callback function
   * @param {String} title (Optional) - Title of the message dialog
   * @param {String} buttonName (Optional) - Button name
   * 
   */
  showMessage: function (message, callback, title, buttonNames) {
    var defaultTitle = Config.APP_NAME,
            defaultButtonName = 'OK';

    if (this.isSupported()) {
      title = title || defaultTitle;
      buttonNames = buttonNames || defaultButtonName;

      navigator.notification.alert(message, callback, title, buttonNames);
    } else {
      alert(message);
      this.invoke(callback);
    }

  },
  /**
   * Displays confirmation dialog.
   * 
   * @param {String} message - Message to display
   * @param {Function} callback (Optional) - Callback function
   * @param {String} title (Optional) - Title of the message dialog
   * @param {Array} buttonNames (Optional) - Array of button names
   * 
   */
  showConfirm: function (message, callback, title, buttonNames) {
    var defaultTitle = Config.APP_NAME,
            defaultButtonNames = ['OK', 'Cancel'],
            callbackWeb,
            callbackNative;

    callbackWeb = function (index) {
      if (typeof (callback) !== 'undefined') {
        callback(index === true);
      }
    };

    callbackNative = function (index) {
      if (typeof (callback) !== 'undefined') {
        callback(index === 1);
      }
    };

    if (this.isSupported()) {
      title = title || defaultTitle;
      buttonNames = buttonNames || defaultButtonNames;
      navigator.notification.confirm(message, callbackNative, title, buttonNames);
    } else {
      this.invoke(callbackWeb, confirm(message));
    }
  }

};