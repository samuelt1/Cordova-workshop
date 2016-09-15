window.TermsConditionsView = Backbone.View.extend({
  initialize: function () {},
  serializeData: function () {
    var data = {};

    data.title = 'Terms and Conditions';
    data.content_html = Config.TERMS_AND_CONDITIONS;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  }

});