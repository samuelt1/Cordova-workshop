window.Router = Backbone.Router.extend({
  routes: {
    '': 'showHome',
    // menu
    'home': 'showHome',
    'notes': 'showNotes',
    'notifications': 'showNotifications',
    // CAROUSEL
    'team': 'showTeam',
    'conditions': 'showConditions',
    'locations/:h_id': 'showLocationCategories',
    'contact/:h_id': 'showContact',
    'services/:h_id': 'showServices',
    'website': 'showWebsite',
    // pages
    'personalize': 'showPersonalize',
    'team/doctors': 'showDoctors',
    'team/doctors/:id': 'showDoctor',
    'team/residents': 'showResidents',
    'team/residents/:id': 'showResident',
    'team/coordinators': 'showCoordinators',
    'team/coordinators/:id': 'showCoordinator',
    'team/staff': 'showStaff',
    'team/staff/:id': 'showStaffMember',
    'team/care_provider_roles': 'showCareProviderRoles',
    'conditions/:id': 'showCondition',
    'contact/social-media': 'showSocialMediaContact',
    'service/:s_id': 'showService',
    'notes/:id': 'showNote',
    // settings
    'settings': 'showSettings',
    'privacy': 'showPrivacy',
    'terms-and-conditions': 'showTermsConditions',
    'reminder-settings': 'showReminderSettings'
  },
  initialize: function () {
    this.headerView = new HeaderView();
    $('#header').html(this.headerView.render().el);

    this.footerView = new FooterView();
    $('#footer').html(this.footerView.render().el);
    CounterAdapter.updateCounter();
  },
  // MENU

  showHome: function () {
    var collection = [];

    dashboardModules = new DashboardModules();
    collection = dashboardModules.getCollection();

    this.homeView = new HomeView({collection: collection, hospital_id: 1});
    this.homeView.render();

    this.loadContent(this.homeView.el, 'home-menu');
  },
  showNotes: function () {
    var collection;

    collection = new Notes();
    collection.fetch({reset: true});

    this.notesView = new NotesView({collection: collection});
    this.notesView.render();
    this.loadContent(this.notesView.el, 'notes-menu');
  },
  showNotifications: function () {
    var notifications,
            collection;

    notifications = new Notifications();
    collection = notifications.getCollection();
    this.notificationsView = new NotificationsView({collection: collection.toJSON()});
    this.notificationsView.render();
    this.loadContent(this.notificationsView.el, 'notifications-menu');
  },
  // CAROUSEL MENU

  showTimeline: function () {
    var surgeryInfo,
            info,
            timeline_id,
            timelineEvents,
            collection;

    surgeryInfo = new SurgeryInfo();
    info = surgeryInfo.getSurgeryInfo();
    timelineEvents = new TimelineEvents();

    timeline_id = 1;

    if (info) {
      timeline_id = parseInt(info.surgery);
    }
    collection = timelineEvents.getCollection(timeline_id);

    this.timelineView = new TimelineView({model: info, collection: collection});
    this.timelineView.render();
    this.loadContent(this.timelineView.el, 'clear');
  },
  showTeam: function () {
    if (!this.teamView) {
      this.teamView = new TeamView();
      this.teamView.render();
    } else {
      this.teamView.delegateEvents();
    }

    this.loadContent(this.teamView.el, 'clear');
  },
  showConditions: function () {
    var conditions,
            collection = [];

    conditions = new Conditions();
    collection = conditions.getCollection();

    this.conditionsView = new ConditionsView({collection: collection});
    this.conditionsView.render();
    this.loadContent(this.conditionsView.el, 'clear');
  },
  showLocationCategories: function (h_id) {
    var categories;

    categories = new LocationCategories();

    this.locationCategoriesView = new LocationCategoriesView({hospital_id: h_id, collection: categories.collection});
    this.locationCategoriesView.render();
    this.loadContent(this.locationCategoriesView.el, 'clear');
  },
  showContact: function (h_id) {
    var contacts;

    this.contactView = new ContactView({hospital_id: h_id});
    this.contactView.render();
    this.loadContent(this.contactView.el, 'clear');
  },
  showVirtualReality: function () {
    this.virtualReality = new VirtualRealityView({videos: Videos.collection});
    this.virtualReality.render();
    this.loadContent(this.virtualReality.el, 'clear');
  },
  showWebsite: function () {
    window.open('http://neurosurgery.ucla.edu/', "_system");
  },
  showService: function (s_id) {
    this.serviceView = new ServiceView({service_id: s_id,collection:new Services()});
    this.serviceView.render();
    this.loadContent(this.serviceView.el, 'clear');
  },
  showServices: function (h_id) {
    
      this.servicesView = new ServicesView({hospital_id: h_id,collection:new Services()});
      this.servicesView.render();
      this.loadContent(this.servicesView.el, 'clear');
    
  },
  // PAGES

  showPersonalize: function () {
    var surgery,
            surgeryInfo,
            surgeryTypes,
            reminderEvents,
            saveText;

    surgeryInfo = new SurgeryInfo();
    surgeryInfo.fetch();

    surgery = surgeryInfo.get(1);
    surgery = surgery || new Surgery({id: 0});

    surgeryTypes = LocalStorageAdapter.getCollection('surgery-types-collection');
    reminderEvents = LocalStorageAdapter.getCollection('reminder-events-collection');

    this.personalizeView = new PersonalizeView({
      model: surgery,
      collection: surgeryInfo,
      surgeryTypes: surgeryTypes,
      reminderEvents: reminderEvents
    });

    this.personalizeView.render();
    this.loadContent(this.personalizeView.el, 'clear');
  },
  showDoctors: function () {
    var doctors,
            collection = [];

    var thisHolder = this;
    doctors = new Doctors();
    doctors.getCollection(function (collection) {
      thisHolder.doctorsView = new DoctorsView({collection: collection});
      thisHolder.doctorsView.render();
      thisHolder.loadContent(thisHolder.doctorsView.el, 'clear');
    });
  },
  showDoctor: function (id) {
    var doctors,
            thisHolder,
            doctor;

    thisHolder = this;
    doctors = new Doctors();
    doctors.getDoctor(id, function (doctor) {

      thisHolder.doctorView = new DoctorView({model: doctor});
      thisHolder.doctorView.render();
      thisHolder.loadContent(thisHolder.doctorView.el, 'clear');
    });
  },
  showResidents: function () {
    var residents,
            collection = [],
            thisHolder;

    thisHolder = this;
    residents = new Residents();
    residents.getCollection(function (collection) {
      thisHolder.residentsView = new ResidentsView({collection: collection});
      thisHolder.residentsView.render();
      thisHolder.loadContent(thisHolder.residentsView.el, 'clear');
    });


  },
  showResident: function (id) {
    var residents,
            thisHolder;

    thisHolder = this;
    residents = new Residents();
    residents.getResident(id, function (resident) {
      thisHolder.residentView = new ResidentView({model: resident});
      thisHolder.residentView.render();
      thisHolder.loadContent(thisHolder.residentView.el, 'clear');
    });
  },
  showCoordinators: function () {
    var coordinators,
            collection = [];

    coordinators = new Coordinators();
    collection = coordinators.getCollection();

    this.coordinatorsView = new CoordinatorsView({collection: collection});
    this.coordinatorsView.render();
    this.loadContent(this.coordinatorsView.el, 'clear');
  },
  showCoordinator: function (id) {
    var coordinators,
            coordinator;

    coordinators = new Coordinators();
    coordinator = coordinators.getCoordinator(id);

    this.coordinatorView = new CoordinatorView({model: coordinator});
    this.coordinatorView.render();
    this.loadContent(this.coordinatorView.el, 'clear');
  },
  showStaff: function () {
    var staff,
            collection = [];

    staff = new Staff();
    collection = staff.getCollection();

    this.staffView = new StaffView({collection: collection});
    this.staffView.render();
    this.loadContent(this.staffView.el, 'clear');
  },
  showStaffMember: function (id) {
    var staff,
            staff_member;

    staff = new Staff();
    staff_member = staff.getStaffMember(id);

    this.staffMemberView = new StaffMemberView({model: staff_member});
    this.staffMemberView.render();
    this.loadContent(this.staffMemberView.el, 'clear');
  },
  showCareProviderRoles: function () {
    var careProviderRoles,
            collection = [];

    careProviderRoles = new CareProviderRoles();
    collection = careProviderRoles.getCollection();

    this.careProviderRolesView = new CareProviderRolesView({collection: collection});
    this.careProviderRolesView.render();
    this.loadContent(this.careProviderRolesView.el, 'clear');
  },
  showCondition: function (id) {
    var conditions,
            condition;

    conditions = new Conditions();
    condition = conditions.getCondition(id);

    this.conditionView = new ConditionView({model: condition});
    this.conditionView.render();
    this.loadContent(this.conditionView.el, 'clear');
  },
  showLocationsByCategory: function (h_id, c_id) {
    var locations,
            categories,
            category;

    categories = new LocationCategories();
    category = categories.getCategory(c_id);
    locations = new Locations({hospital_id: h_id, category_id: c_id});
    footerView = this.footerView;
    locations.getLocations(function (data) {
      if (data) {
        this.locationsByCategoryView = new LocationsByCategoryView({collection: data, hospital_id: h_id, category: category});
        this.locationsByCategoryView.render();
        $('#content').html(this.locationsByCategoryView.el);
        footerView.clear();
      }
    }, this);
  },
  showLocation: function (h_id, c_id, place_id) {
    var footerView;

    footerView = this.footerView;
    ServiceAdapter.getLocationDetails(place_id, function (result) {
      this.locationView = new LocationView({
        hospital_id: h_id,
        category_id: c_id,
        location: result
      });
      this.locationView.render();
      $('#content').html(this.locationView.el);
      footerView.clear();
    });
  },
  showDepartmentContact: function (h_id) {
    var contacts,
            contact;

    contacts = new Contacts();
    contact = contacts.getContactByHospital(h_id);
    this.departmentView = new DepartmentView({model: contact});
    this.departmentView.render();
    $('#content').html(this.departmentView.el, 'clear');
  },
  showClinicContact: function (h_id) {
    this.clinicView = new ClinicView({hospital_id: h_id});
    this.clinicView.render();
    this.loadContent(this.clinicView.el, 'clear');
  },
  showClinicTransportationMap: function (h_id) {
    var contacts,
            contact;

    contacts = new Contacts();
    contact = contacts.getContactByHospital(h_id);
    this.transportationView = new TransportationView({model: contact, facility: 'clinic'});
    this.transportationView.render();
    this.loadContent(this.transportationView.el, 'clear');
  },
  showClinicFloorMaps: function (h_id) {
    var contacts,
            contact;

    contacts = new Contacts();
    contact = contacts.getContactByHospital(h_id);
    this.floorsView = new FloorsView({model: contact, facility: 'clinic'});
    this.floorsView.render();
    this.loadContent(this.floorsView.el, 'clear');
  },
  showClinicFloorMap: function (h_id, id) {
    var contacts,
            contact;

    contacts = new Contacts();
    contact = contacts.getContactByHospital(h_id);
    this.floorView = new FloorView({model: contact, floor_id: id, facility: 'hospital'});
    this.floorView.render();
    this.loadContent(this.floorView.el, 'clear');
    this.floorView.startCanvas();
  },
  showClinicDirections: function (h_id) {
    var contacts,
            contact;

    contacts = new Contacts();
    contact = contacts.getContactByHospital(h_id);

    this.directionsView = new DirectionsView({model: contact, facility: 'clinic'});
    this.directionsView.render();
    this.loadContent(this.directionsView.el, 'clear');
  },
  showHospitalContact: function (h_id) {
    this.hospitalView = new HospitalView({hospital_id: h_id});
    this.hospitalView.render();

    this.loadContent(this.hospitalView.el, 'clear');
  },
  showHospitalTransportationMap: function (h_id) {
    var contacts,
            contact;

    contacts = new Contacts();
    contact = contacts.getContactByHospital(h_id);
    this.transportationView = new TransportationView({model: contact, facility: 'hospital'});
    this.transportationView.render();

    this.loadContent(this.transportationView.el, 'clear');
  },
  showHospitalFloorMaps: function (h_id) {
    var contacts,
            contact;

    contacts = new Contacts();
    contact = contacts.getContactByHospital(h_id);
    this.floorsView = new FloorsView({model: contact, facility: 'hospital'});
    this.floorsView.render();

    this.loadContent(this.floorsView.el, 'clear');
  },
  showHospitalFloorMap: function (h_id, id) {
    var contacts,
            contact;

    contacts = new Contacts();
    contact = contacts.getContactByHospital(h_id);
    this.floorView = new FloorView({model: contact, floor_id: id, facility: 'hospital'});
    this.floorView.render();
    this.loadContent(this.floorView.el, 'clear');
    this.floorView.startCanvas();
  },
  showHospitalDirections: function (h_id) {
    var contacts,
            contact;

    contacts = new Contacts();
    contact = contacts.getContactByHospital(h_id);
    this.directionsView = new DirectionsView({model: contact, facility: 'hospital'});
    this.directionsView.render();

    this.loadContent(this.directionsView.el, 'clear');
  },
  showSocialMediaContact: function (h_id) {
    this.socialMediaView = new SocialMediaView();
    this.socialMediaView.render();

    this.loadContent(this.socialMediaView.el, 'clear');
  },
  showNote: function (id) {
    var collection,
            model,
            saveText,
            img;

    collection = new Notes();
    collection.fetch();

    model = collection.get(id);
    model = model || new Note({id: 0});

    this.noteView = new NoteView({
      model: model,
      collection: collection,
    });

    this.noteView.render();
    this.loadContent(this.noteView.el, 'clear');
  },
  showVideo: function (v_id) {
    var video = Videos.getVideo(v_id);
    this.videoView = new VideoView({video: video});
    if (window.NetworkAdapter.isConnected()) {
      this.videoView.render();

      this.loadContent(this.videoView.el, 'clear');
    } else {
      DialogAdapter.showMessage('No network connection detected. This feature will not work.');
    }
  },
  // SETTINGS

  showSettings: function () {
    var collection;

    collection = [];
    this.settingsView = new SettingsView({collection: collection});
    this.settingsView.render();
    this.loadContent(this.settingsView.el, 'clear');
  },
  showPrivacy: function () {
    this.privacyView = new PrivacyView();
    this.privacyView.render();
    this.loadContent(this.privacyView.el, 'clear');
  },
  showTermsConditions: function () {
    this.termsConditionsView = new TermsConditionsView();
    this.termsConditionsView.render();
    this.loadContent(this.termsConditionsView.el, 'clear');
  },
  showReminderSettings: function () {
    var reminderSettingsInfo,
            model;

    reminderSettingsInfo = new ReminderSettingsInfo();
    reminderSettingsInfo.fetch();

    model = reminderSettingsInfo.getReminderSettingsInfo();

    this.reminderSettingsView = new ReminderSettingsView({
      model: model
    });
    this.reminderSettingsView.render();
    this.loadContent(this.reminderSettingsView.el, 'clear');
  },
  // MISC.

  loadContent: function (contentElement, selectedFooter) {
    var content;

    content = $('#content');

    if (contentElement) {
      content.html(contentElement);
      content.scrollTop(0);
    }

    if (selectedFooter !== 'clear') {
      this.footerView.select(selectedFooter);
    } else {
      this.footerView.clear();
    }

    CounterAdapter.updateCounter();
  }

});

window.onRouteChange = function (route, params) {
  if (route === "showHome") {
    $("#content").css({"overflow-y": "hidden"});
  } else {
    $("#content").css({"overflow-y": "scroll"});
  }

};