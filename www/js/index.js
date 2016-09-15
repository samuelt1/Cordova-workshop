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
  
  if (typeof (FastClick) !== 'undefined') {
    FastClick.attach(document.body);
    console.log('fastclick loaded.');
  }

  if (typeof (Spinner) !== 'undefined') {
    SpinAdapter.initialize();
    console.log('spinner loaded.');
  }


  termsAgreementInfo = new TermsAgreementInfo();
  termsAgreementInfo.addTermsAgreementInfo();

  if (typeof (cordova) !== 'undefined') {
    document.addEventListener('resume', onResume, false);
    console.log('onResume loaded.');

    document.addEventListener("backbutton", onBackButton, false);
    console.log('onBackButton loaded.');

    fixContentSize();
    console.log('Content Size Fixed');

  }

  window.router = new Router();
  window.router.on("route", onRouteChange);
  Backbone.history.start();
};

var onResume = function () {

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
    'ContactView',
    'ServicesView',
    // pages
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
    'SocialMediaView',
    'ServiceView',
    // partials
    'SearchConditionsView',
    'SearchPeopleView',
    // settings
    'SettingsView',
    'TermsConditionsView'
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
