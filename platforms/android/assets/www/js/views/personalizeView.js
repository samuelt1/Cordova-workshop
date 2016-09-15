window.PersonalizeView = Backbone.View.extend({
  initialize: function (attrs) {
    this.model = attrs.model || {};
    this.collection = attrs.collection || [];
    this.reminderEvents = attrs.reminderEvents || [];

    if (NetworkAdapter.isConnected() === true) {
      this.checkServer();
    }
  },
  events: {
    'click #btnSave': 'savePromptWarning'
  },
  serializeData: function () {
    var data = {},
            surgeryDate,
            dateString,
            reminders,
            reminderTypes,
            locations;

    data.title = 'Personalize Surgery';
    data.surgery = this.model.toJSON();
    surgeryDate = moment(data.surgery.date);
    data.surgery.date = surgeryDate.format('YYYY-MM-DD')

    locations = [
      {id: 1, order: 1, name: 'Westwood'},
      {id: 2, order: 2, name: 'Santa Monica'}
    ];
    data.locationsArr = _.sortBy(locations, 'name');

    surgeries = [
      {id: 1, order: 2, name: 'Spinal'},
      {id: 2, order: 1, name: 'Cranial'}
    ];
    data.surgeriesArr = _.sortBy(surgeries, 'order');

    reminders = [
      {id: 1, order: 1, name: 'Patient (adult)'},
      {id: 2, order: 2, name: 'Patient (minor)'},
      {id: 3, order: 3, name: 'Parent'}
    ];
    data.usersArr = _.sortBy(reminders, 'order');

    data.saveText = 'Save';

    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  isCheckServer: function () {
    var isCheck;

    isCheck = true;
    return isCheck;
  },
  checkReminderType:function(id,type){
    var current = LocalStorageAdapter.getCollectionEtagInfo('reminder-events-'+type+'-collection');
    ServiceAdapter.getReminderEvents(id, function (data, etag) {
      if (!current || current.etag !== etag) {
        LocalStorageAdapter.clearCollection('reminder-events-'+type+'-collection');
        LocalStorageAdapter.setCollection('reminder-events-'+type+'-collection', data, etag);
        console.log('reminder events list for '+type+'s has been updated.');
      }
    });
  },
  checkServer: function () {
    this.checkReminderType(1,"patient");
    this.checkReminderType(2,"parent");
    this.checkReminderType(3,"other");
  },
  savePromptWarning: function () {
    if (parseInt(this.model.id) === 0) {
      this.savePersonalSettings();
    } else {
      DialogAdapter.showConfirm('Saving new settings will reset the current reminders. Do you want to proceed?', function (isConfirm) {
        if (isConfirm === true) {
          this.savePersonalSettings();
        }
      }.bind(this));
    }
  },
  savePersonalSettings: function () {
    var formData,
            surgery,
            message,
            errors,
            i;

    SpinAdapter.show();
    strDate = $("#txtDate").val().trim();

    formData = {
      date: strDate,
      surgery: parseInt($("input[name='surgery']:checked").val()) || null,
      location: parseInt($("input[name='location']:checked").val()) || null,
      user: parseInt($("input[name='user']:checked").val()) || null
    };
    console.log('formData: ' + JSON.stringify(formData));

    surgery = new Surgery();

    errors = surgery.validate(formData);
    if (errors) {
      message = 'Errors encountered: \n';
      for (i = 0; i < errors.length; i++) {
        message += ' - ' + errors[i] + '\n';
      }
      console.log(message);
      DialogAdapter.showMessage(message);
      SpinAdapter.hide();
    } else {
      console.log('saving surgery info.');
      formData.date = moment(strDate).toDate();
      formData.updated_at = moment().toDate();
      if (parseInt(this.model.id) === 0) {
        formData.id = 1;
        this.collection.add(surgery)
        surgery.save(formData);
      } else {
        this.model.save(formData);
      }

      var addNotifications = this.addNotifications,
              goToTimeline = this.goToTimeline;

      if (LocalNotificationAdapter.isSupported() === true) {
        this.clearNotifications(function () {
          addNotifications(formData.user, formData.date);
          SpinAdapter.hide();
          DialogAdapter.showMessage('Surgery has been personalized.', goToTimeline);
        });
      } else {
        addNotifications(formData.user, formData.date);
        SpinAdapter.hide();
        DialogAdapter.showMessage('Surgery has been personalized.', goToTimeline);
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
  goToTimeline: function () {



    router.navigate('timeline', {trigger: true});
  }

});