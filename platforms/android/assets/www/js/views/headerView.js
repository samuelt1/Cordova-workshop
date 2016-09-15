window.HeaderView = Backbone.View.extend({
  initialize: function () {},
  serializeData: function () {
    var data = {};

    data.appName = Config.APP_NAME;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  events: {
    'click #btnBack': 'goBack',
  },
  goBack: function () {
    window.history.back();
  },
  displayBackButton: function (isDisplay) {
    var btnBack;

    btnBack = document.getElementById('btnBack');
    btnBack.style.display = isDisplay === true ? 'block' : 'none';
  }

});