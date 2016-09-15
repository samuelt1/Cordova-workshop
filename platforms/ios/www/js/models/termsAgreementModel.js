window.TermsAgreement = Backbone.Model.extend({
  defaults: {
    id: 0,
    is_agree: false
  }

});

window.TermsAgreementInfo = Backbone.Collection.extend({
  model: TermsAgreement,
  localStorage: new Backbone.LocalStorage('terms-agreement-info'),
  addTermsAgreementInfo: function () {
    var data = {},
            now;

    if (this.isSet() === false) {
      now = new Date();
      data = [{
          id: 1,
          is_agree: false,
        }];

      LocalStorageAdapter.setCollection('terms-agreement-info', data, now.getTime().toString());
      console.log('terms and agreement initialized.');
    }
  },
  isSet: function () {
    return typeof (this.getTermsAgreementInfo()) !== 'undefined';
  },
  getTermsAgreementInfo: function () {
    var info;

    info = LocalStorageAdapter.getJSON('terms-agreement-info-1');
    return info;
  },
  updateTermsAgreementInfo: function (data) {
    LocalStorageAdapter.setJSON('terms-agreement-info-1', data);
  }

});