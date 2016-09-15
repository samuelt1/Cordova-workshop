window.CounterAdapter = {
  initialize: function () {},
  updateCounter: function () {
    var count,
            badge,
            counter;

    count = this.getNotificationsCount();
    badge = document.getElementById('badgeCounter');
    counter = document.getElementById('lblCounter');
    counter.innerHTML = count;

    badge.style.display = count === 0 ? 'none' : 'block';
  },
  getNotificationsCount: function () {
    var notifications = [],
            collection,
            filtered,
            date_check,
            date_scheduled;

    date_check = new Date();

    notifications = new Notifications();

    collection = notifications.getCollection().toJSON();

    filtered = _.filter(collection, function (item) {
      date_scheduled = new Date(item.date);
      return item.is_completed === false && date_scheduled.getTime() > date_check.getTime();
    });

    return _.size(filtered);
  }

};