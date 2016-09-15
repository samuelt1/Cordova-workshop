window.SearchConditionsView = Backbone.View.extend({
  initialize: function (attrs) {
    this.collection = attrs.collection;
    this.urlRoot = attrs.urlRoot;
    this.listenTo(this.collection, 'reset', this.render);
  },
  serializeData: function () {
    var data = {};

    data.root = this.urlRoot;
    data.results = this.collection.toJSON();
    return data;
  },
  render: function () {
    $(this.el).empty();
    $(this.el).html(this.template(this.serializeData()));
    return this;
  }
});