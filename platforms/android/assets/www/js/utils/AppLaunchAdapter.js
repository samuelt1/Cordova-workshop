window.AppLaunchAdapter = {
  appInfo: {},
  initialize: function () {
    if (this.isSupported() !== true) {
      console.log('App Launcher is not supported.');
    }
  },
  isSupported: function () {
    return typeof (startApp) !== 'undefined';
  },
  isInstalled: function (launchUrl, callback) {
    console.log('checking if app installed');
    if (this.isSupported() === true) {
      window.appAvailability.check(
              launchUrl,
              function () {
                if (typeof (callback) !== 'undefined') {
                  callback(true);
                }
              },
              function (message) {
                console.log("App Not Installed");
                if (typeof (callback) !== 'undefined') {
                  callback(false);
                }
              });
    } else {
      if (typeof (callback) !== 'undefined') {
        callback(false);
      }
    }
  },
  downloadSocialMedia: function (isConfirm) {
    if (isConfirm === true) {
      this.launchExternalApp(this.appInfo.WEB);
    } else {
      this.launchExternalApp(this.getOS(this.appInfo.app.STORE));
    }
  },
  launchApp: function (download) {
    var messageDownload = this.appInfo.app.NAME + ' is not installed.';
    this.isInstalled(this.getOS(this.appInfo.app.URI), function (is_installed) {
      if (is_installed === true) {
        this.launchExternalApp(this.getOS(this.appInfo.APP));
      } else {
        DialogAdapter.showConfirm(
                messageDownload,
                download,
                null,
                this.appInfo.choices
                );
      }
    }.bind(this));
  },
  getOS: function (APP) {
    if (this.isSupported() === true && ApplicationHelper.isiOS() === true && APP.IOS) {
      return APP.IOS;
    } else if (this.isSupported() === true && ApplicationHelper.isAndroid() === true && APP.ANDROID) {
      return APP.ANDROID;
    }
    return APP;
  },
  launchSocialMedia: function (appInfo, socialMedia) {
    console.log('launching social media');

    this.appInfo = {
      app: socialMedia,
      APP: appInfo.APP,
      WEB: appInfo.WEB,
      choices: ['View on web', 'Download App']
    };

    if (this.isSupported() === true &&
            (ApplicationHelper.isiOS() === true ||
                    ApplicationHelper.isAndroid() === true)) {
      this.launchApp(this.downloadSocialMedia.bind(this));
    } else {
      this.launchExternalApp(appInfo.WEB);
    }
  },
  downloadMyChart: function (isConfirm) {
    if (isConfirm === true) {
      this.launchExternalApp(this.getOS(this.appInfo.app.STORE));
    }
  },
  launchMyChart: function () {
    console.log('launching myChart');


    var mychart = Config.MYCHART;

    this.appInfo = {
      app: mychart,
      APP: mychart.APP,
      choices: ['Download App', 'Cancel']
    };

    if (this.isSupported() === true &&
            (ApplicationHelper.isiOS() === true ||
                    ApplicationHelper.isAndroid() === true)) {
      this.launchApp(this.downloadMyChart.bind(this));
    } else {
      this.launchExternalApp(mychart.WEB);
    }
  },
  launchExternalApp: function (url, callback) {
    window.open(url, '_system', 'location=no');
  }

};
