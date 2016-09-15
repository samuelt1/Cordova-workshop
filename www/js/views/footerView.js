window.FooterView = Backbone.View.extend({
  initialize: function () {},
  serializeData: function () {
    var data = {};
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  events: {
    'click #lnkChart': 'openChart'
  },
  select: function (menuItem) {
    var key,
            img,
            active;

    key = menuItem.replace('-menu', '');
    img = '#img' + ApplicationHelper.capitalizeFirstLetter(key);
    active = 'img/icons/' + key + '-active.png';

    this.clear();
    $('.' + menuItem).addClass('active');
    $(img).attr('src', active);
  },
  clear: function () {
    $('.bar-tab .tab-item').removeClass('active');
    $('#imgHome').attr('src', 'img/icons/home.png');
    $('#imgNotes').attr('src', 'img/icons/notes.png');
    $('#imgNotifications').attr('src', 'img/icons/notifications.png');
  },
  openChart: function () {
    AppLaunchAdapter.launchMyChart();
  },
  test: function () {
    var now,
            notifications;

    /*
     now = new Date();
     notif1 = { id: 1, time: new Date(now.getTime() + 1 * 60 * 1000) };
     notif2 = { id: 2, time: new Date(now.getTime() + 2 * 60 * 1000) };
     notifs = [ notif1, notif2 ];
     
     LocalNotificationAdapter.schedule(notif1);
     LocalNotificationAdapter.scheduleMultiple(notifs);
     */

    var reminders = [];

    var options_reminder = {
      id: 20,
      time: new Date(new Date().getTime() + 2 * 60 * 1000)
    };
    console.log('scheduling: ' + JSON.stringify(options_reminder));
    cordova.plugins.notification.local.schedule({
      id: options_reminder.id,
      title: 'test',
      text: 'You have a reminder!',
      firstAt: new Date(new Date().getTime() + 2 * 60 * 1000)
    });

  }

});