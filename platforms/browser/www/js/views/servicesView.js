window.ServicesView = Backbone.View.extend({
  initialize: function (attrs) {
    this.hospital_id = attrs.hospital_id;
    this.collection = attrs.collection;
    if (NetworkAdapter.isConnected() === true) {
      this.checkServer();
    } else {
        DialogAdapter.showMessage('No network connection detected. Services cannot be downloaded.');
    }
  },
  events: {
    'click #tabWestwood': 'switchTabs',
    'click #tabSantaMonica': 'switchTabs',
  },
  serializeData: function () {
    var data = {};

    data.title = 'Hospital Services';
    data.emptyText = 'No Hospital Services found.';
    data.hospital_id = this.hospital_id;
    data.services = this.collection.getServices(parseInt(this.hospital_id));
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  switchTabs: function (e) {
    e.preventDefault();
    id = $(e.currentTarget).data('id');
    router.navigate('#services/' + id, {trigger: true, replace: true});
  },
  checkServer: function () {
    var collection,
            current,
            updated,
            elapsed,
            render,
            now;

    collection = this.collection;
    render = this.render;
    current = LocalStorageAdapter.getCollectionEtagInfo('services-collection');
    updated = typeof (current) !== 'undefined' ? new Date(current.updated_at) : new Date();
    elapsed = new Date(updated.getTime() + Config.UPDATE_CHECK.HOURS * 60 * 60 * 1000);
    now = new Date();

    if (typeof (current) === 'undefined') {
      SpinAdapter.show();
      ServiceAdapter.getServices(function (data, etag) {
        LocalStorageAdapter.clearCollection('services-collection');
        LocalStorageAdapter.setCollection('services-collection', data, etag);
        collection.reset(data);
        SpinAdapter.hide();
        Backbone.history.loadUrl(Backbone.history.fragment);
      });
    } else if (elapsed.getTime() < now.getTime()) {
      console.log('Checking for services updates.');
      ServiceAdapter.getServices(function (data, etag) {
        if (current.etag !== etag) {
          SpinAdapter.show();
          LocalStorageAdapter.clearCollection('services-collection');
          LocalStorageAdapter.setCollection('services-collection', data, etag);
          collection.reset(data);
          DialogAdapter.showMessage('Services have been updated.', function () {
            SpinAdapter.hide();
            Backbone.history.loadUrl(Backbone.history.fragment);
          });
        } else {
          console.log('Services already updated.');
        }
      });
    } else {
      console.log('Services recently updated.');
    }
  },
  goBack: function () {
    window.history.back();
  },
});

window.ServiceView = Backbone.View.extend({
  initialize: function (attrs) {
    this.service_id = attrs.service_id;
    this.collection = attrs.collection;
  },
  serializeData: function () {
    var data = {},
            service;

    service = this.collection.getService(this.service_id);

    data.service = service;

    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  }

});

