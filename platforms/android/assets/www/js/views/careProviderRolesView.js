window.CareProviderRolesView = Backbone.View.extend({
  initialize: function (attrs) {
    this.collection = attrs.collection || [];

    if (NetworkAdapter.isConnected() === true) {
      this.checkServer();
    } else {
      if (this.collection.toJSON().length === 0) {
        DialogAdapter.showMessage('No network connection detected. Contents cannot be downloaded.');
      }
    }
  },
  serializeData: function () {
    var data = {};

    data.title = 'Care Provider Roles';
    data.emptyText = 'No care provider roles found.';
    data.roles = _.sortBy(this.collection.toJSON(), 'order');
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  checkServer: function () {
    var collection,
            current,
            updated,
            elapsed,
            now;

    collection = this.collection;
    current = LocalStorageAdapter.getCollectionEtagInfo('care-provider-roles-collection');
    updated = typeof (current) !== 'undefined' ? new Date(current.updated_at) : new Date();
    elapsed = new Date(updated.getTime() + Config.UPDATE_CHECK.HOURS * 60 * 60 * 1000);
    now = new Date();

    if (typeof (current) === 'undefined') {
      console.log('initializing care provider roles.');
      SpinAdapter.show();
      ServiceAdapter.getCareProviderRoles(function (data, etag) {
        LocalStorageAdapter.clearCollection('care-provider-roles-collection');
        LocalStorageAdapter.setCollection('care-provider-roles-collection', data, etag);
        collection.reset(data);
        SpinAdapter.hide();
        Backbone.history.loadUrl(Backbone.history.fragment);
      });
    } else if (elapsed.getTime() < now.getTime()) {
      console.log('checking for care provider role updates.');
      ServiceAdapter.getCareProviderRoles(function (data, etag) {
        if (current !== etag) {
          SpinAdapter.show();
          LocalStorageAdapter.clearCollection('care-provider-roles-collection');
          LocalStorageAdapter.setCollection('care-provider-roles-collection', data, etag);
          collection.reset(data);
          DialogAdapter.showMessage('care provider roles have been updated.', function () {
            SpinAdapter.hide();
            Backbone.history.loadUrl(Backbone.history.fragment);
          });
        } else {
          console.log('care provider roles already updated.');
        }
      });
    } else {
      console.log('care provider roles recently updated.');
    }
  },
})