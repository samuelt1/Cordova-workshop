window.PrivacyView = Backbone.View.extend({
  initialize: function () {},
  serializeData: function () {
    var data = {};

    data.title = 'Privacy';
    data.content_html = Config.PRIVACY;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  }

});