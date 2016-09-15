window.LocationCategoriesView = Backbone.View.extend({
  initialize: function (attrs) {
    this.hospital_id = attrs.hospital_id || Config.HOSPITAL_DEFAULT;
    this.collection = attrs.collection || [];
    if (NetworkAdapter.isConnected() === false) {
      DialogAdapter.showMessage('No network connection detected. This feature will not work.', this.goBack);
    }
  },
  events: {
    'click #tabWestwood': 'switchTabs',
    'click #tabSantaMonica': 'switchTabs',
  },
  serializeData: function () {
    var data = {};

    data.title = 'Nearby';
    data.hospital_id = parseInt(this.hospital_id);
    data.emptyText = 'No location categories found.';
    data.categories = this.collection;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  switchTabs: function (e) {
    

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    
    router.navigate('#locations/' + id, {trigger: true, replace: true});
  },
  goBack: function () {
    window.history.back();
  },
});