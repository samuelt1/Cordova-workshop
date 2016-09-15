window.HomeView = Backbone.View.extend({
  initialize: function (attrs) {
    this.collection = attrs.collection;
    this.hospital_id = attrs.hospital_id;
  },
  serializeData: function () {
    var data = {};

    data.title = 'Home';
    data.hospital_id = this.hospital_id;
    data.emptyText = 'No dashboard modules found.';
    data.modules = _.sortBy(this.collection, 'order');
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  events: {
    'click .carousel-image': 'goToPage'
  },
  checkServer: function () {
    var collection,
            current,
            updatedCollection = [],
            removeCollection = [],
            image,
            updated,
            elapsed,
            now;

    collection = this.collection;
    current = LocalStorageAdapter.getCollectionEtagInfo('dashboard-modules-collection');
    now = new Date();

    if (typeof (current) === 'undefined') {
      SpinAdapter.show();
      ServiceAdapter.getDashboardModules(function (data, etag) {
        LocalStorageAdapter.clearCollection('dashboard-modules-collection');
        LocalStorageAdapter.setCollection('dashboard-modules-collection', data, etag);
        SpinAdapter.hide();
        DialogAdapter.showMessage('Dashboard has been downloaded.', function () {
          Backbone.history.loadUrl(Backbone.history.fragment);
        });
      });
    }
  },
  goToPage: function (e) {
    var key;

    e.preventDefault();
    key = $(e.currentTarget).data('id');

        router.navigate(key, {trigger: true});
  }

});