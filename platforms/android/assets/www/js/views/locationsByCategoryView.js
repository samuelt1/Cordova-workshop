window.LocationsByCategoryView = Backbone.View.extend({
  initialize: function (attrs) {
    this.collection = attrs.collection || [];
    this.hospital_id = attrs.hospital_id || Config.HOSPITAL_DEFAULT;
    this.category = attrs.category;
  },
  events: {
    'click #tabWestwood': 'switchTabs',
    'click #tabSantaMonica': 'switchTabs',
  },
  serializeData: function () {
    var data = {};

    data.title = 'Nearby - ' + this.category.name;
    data.hospital_id = parseInt(this.hospital_id);
    data.category_id = this.category.id;
    data.emptyText = 'No locations found.';
    data.locations = this.collection;
    return data;
  },
  render: function () {
    SpinAdapter.show();
    $(this.el).html(this.template(this.serializeData()));
    SpinAdapter.hide();
    return this;
  },
  switchTabs: function (e) {
    

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    
    router.navigate('#locations/' + id + '/' + this.category.id, {trigger: true, replace: true});
  }

});