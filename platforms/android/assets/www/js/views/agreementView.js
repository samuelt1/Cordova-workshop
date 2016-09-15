window.AgreementView = Backbone.View.extend({
  initialize: function (attrs) {
  },
  events: {
    'click #btnOk': 'agree',
    'click #btnCancel': 'cancel',
  },
  serializeData: function () {
    var data = {};

    data.header = Config.APP_NAME;
    data.title = 'Terms & Conditions';
    data.content = Config.TERMS_AND_CONDITIONS;
    return data;
  },
  render: function () {
    $(this.el).append(this.template(this.serializeData()));
    return this;
  },
  show: function (options) {
    $('#header').append(this.render().el);
  },
  agree: function () {
    var termsAgreementInfo;

    termsAgreementInfo = new TermsAgreementInfo();
    termsAgreementInfo.updateTermsAgreementInfo({is_agree: true});

    this.render().el.remove();
    this.goToPersonalize();
  },
  cancel: function () {
    this.render().el.remove();
  },
  goToPersonalize: function () {
    

    
    router.navigate('personalize', {trigger: true});
  }

});