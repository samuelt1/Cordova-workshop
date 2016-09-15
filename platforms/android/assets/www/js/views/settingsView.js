window.SettingsView = Backbone.View.extend({
  initialize: function () {},
  events: {
    'click #btnClear': 'promptClearData'
  },
  serializeData: function () {
    var data = {};
    data.title = 'Settings';
    data.version = Config.VERSION;
    data.copyright = Config.COPYRIGHT.NAME;
    data.year = Config.COPYRIGHT.YEAR;

    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  /**
   * Clears data upon user confirmation.
   * 
   * @param {Bool} confirmation - User confirmation response
   * 
   */
  clearData: function (isClear) {
    if (isClear) {
      var reminderSettingsInfo;

      // clear saved data
      LocalNotificationAdapter.cancelAll();
      LocalStorageAdapter.clearAll();

      // reset defaults
      reminderSettingsInfo = new ReminderSettingsInfo();
      reminderSettingsInfo.addReminderSettingsInfo();

      termsAgreementInfo = new TermsAgreementInfo();
      termsAgreementInfo.addTermsAgreementInfo();

      CounterAdapter.updateCounter();
      
      SQLiteAdapter.truncateImages();
    }
  },
  /**
   * Prompts user before clearing data.
   * 
   */
  promptClearData: function () {
    var clearButtons;

    clearButtons = ['Clear', 'Cancel'];

    // Prompts user for confirmation before clearing data
    DialogAdapter.showConfirm('Are you sure you want to clear the data?', this.clearData, null, clearButtons);
  }

});