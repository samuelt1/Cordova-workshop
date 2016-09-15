$(function () {
  if (window.cordova) {
    document.addEventListener('deviceready', onDeviceReady, false);
  } else {
    onDeviceReady();
  }
});

var onDeviceReady = function () {
  console.log('Device is ready.');

  if (typeof (screen) !== 'undefined') {
    screen.lockOrientation("portrait");
    console.log('screen loaded.');
  }

  // Load templates for views
  TemplateLoader.loadTemplates(onLoaded);
};

var onLoaded = function () {
  var reminderSettingsInfo,
          reminderView,
          notifications,
          notification,
          settingsInfo,
          hospital;

  if (typeof (FastClick) !== 'undefined') {
    FastClick.attach(document.body);
    console.log('fastclick loaded.');
  }

  if (typeof (Spinner) !== 'undefined') {
    SpinAdapter.initialize();
    console.log('spinner loaded.');
  }

  reminderSettingsInfo = new ReminderSettingsInfo();
  reminderSettingsInfo.addReminderSettingsInfo();

  termsAgreementInfo = new TermsAgreementInfo();
  termsAgreementInfo.addTermsAgreementInfo();

  /*
   if (GeolocationAdapter.isSupported()) {
   GeolocationAdapter.getCurrentLocation(function (data) {
   console.log('geolocation.getCurrentLocation: ' + JSON.stringify(data));
   hospital = GeolocationAdapter.getNearestLocation({ latitude: data.latitude, longitude: data.longitude }, Config.FACILITIES.LOCATIONS, Config.FACILITIES.DEFAULT);
   console.log('location setting: ' + JSON.stringify(hospital));
   });
   } else {
   console.log('location setting defaulted: ' + JSON.stringify(Config.FACILITIES.DEFAULT));
   }
   */

  if (typeof (cordova) !== 'undefined') {
    document.addEventListener('resume', onResume, false);
    console.log('onResume loaded.');
    cordova.plugins.notification.local.registerPermission(function (granted) {
    });

    document.addEventListener("backbutton", onBackButton, false);
    console.log('onBackButton loaded.');

    fixContentSize();
    console.log('Content Size Fixed');

    cordova.plugins.notification.local.on('click', function (localNotification) {
      console.log('local notification trigger: ' + JSON.stringify(localNotification));
      if (typeof (localNotification) !== 'undefined') {
        reminderView = new ReminderView({id: localNotification.id}, false);
        reminderView.show();
        LocalNotificationAdapter.clear();
      }
    });
    console.log('local notification click handling loaded.');

    cordova.plugins.notification.local.on('trigger', function (localNotification, status) {
      console.log('local notification trigger: ' + JSON.stringify(localNotification));
      console.log('local notification trigger.status: ' + status);
      if (typeof (localNotification) !== 'undefined') {

        if (status === 'foreground') {
          reminderView = new ReminderView({id: localNotification.id}, false);
          reminderView.show();
          LocalNotificationAdapter.clear();
        }
      }
    });
    console.log('local notification trigger handling loaded.');

    window.SQLiteAdapter.db = window.sqlitePlugin.openDatabase(
            {name: 'new2.db', location: 'default'},
            function (db) {
              db.executeSql(
                      'CREATE TABLE IF NOT EXISTS images(id,key,data,check_sum, type)',
                      [],
                      function (resultSet) {
                        console.log('Images table created');
                      },
                      function (error) {
                        console.error("images table not created" + error.message);
                      });
            },
            function (err) {
              console.error('Open database ERROR: ' + JSON.stringify(err));
              var i = 0;
            }
    );
  }

  window.router = new Router();
  window.router.on("route", onRouteChange);
  Backbone.history.start();
};

var onResume = function () {
  CounterAdapter.updateCounter();
  LocalNotificationAdapter.clear();
};

var onBackButton = function () {
  console.log('back button clicked.');
};

var TemplateLoader = {
  templateViews: [
    'HeaderView',
    'FooterView',
    // menu
    'HomeView',
    'NotesView',
    'NoteView',
    'NotificationsView',
    // carousel
    'TimelineView',
    'TeamView',
    'ConditionsView',
    'LocationCategoriesView',
    'ContactView',
    'VirtualRealityView',
    'ServicesView',
    // pages
    'PersonalizeView',
    'DirectionsView',
    'DoctorsView',
    'DoctorView',
    'ResidentsView',
    'ResidentView',
    'CoordinatorsView',
    'CoordinatorView',
    'StaffView',
    'StaffMemberView',
    'ResidentsView',
    'ResidentView',
    'CareProviderRolesView',
    'ConditionView',
    'LocationsByCategoryView',
    'LocationView',
    'HospitalView',
    'DepartmentView',
    'ClinicView',
    'TransportationView',
    'FloorsView',
    'FloorView',
    'SocialMediaView',
    'ServiceView',
    'VideoView',
    // partials
    'SearchConditionsView',
    'SearchPeopleView',
    // settings
    'SettingsView',
    'PrivacyView',
    'AgreementView',
    'TermsConditionsView',
    'ReminderView',
    'ReminderSettingsView'
  ],
  loadTemplates: function (callback) {
    var deferreds = [],
            views;

    views = this.templateViews;

    $.each(views, function (index, view) {
      if (window[view]) {
        deferreds.push($.get('templates/' + view + '.html', function (data) {
          window[view].prototype.template = _.template(data);
        }, 'html'));
      } else {
        console.log(view + ' not found.');
      }
    });

    console.log('templates loaded.');

    $.when.apply(null, deferreds).done(callback);
  }
};

var fixContentSize = function () {
  var height,
          windowHeight,
          headerHeight,
          footerHeight,
          contentHeight;
  windowHeight = window.innerHeight;
  headerHeight = 80;
  footerHeight = 60;

  contentHeight = windowHeight - headerHeight - footerHeight;
  $("#content").css('height', contentHeight + 'px');
}

var loadDB = function () {
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
  }
}
