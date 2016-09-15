window.VirtualRealityView = Backbone.View.extend({
  initialize: function (attrs) {
    this.videos = attrs.videos;
  },
  serializeData: function () {
    var data = {};
    
    data.title = 'Virtual Reality';
    data.emptyText = 'No Virtual Reality info found.';
    data.videos = this.videos;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },

});