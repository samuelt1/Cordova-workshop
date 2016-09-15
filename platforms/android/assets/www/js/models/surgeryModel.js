window.Surgery = Backbone.Model.extend({
  defaults: {
    'id': 0,
    'date': null,
    'surgery': 0,
    'type': 0,
    'location': 0,
    'updated_at': null
  },
  validate: function (attrs) {
    var invalid = [];

    // Checks for valid date field
    if (attrs.date === '') {
      invalid.push('Date field is required.');
    } else if (isNaN(moment(attrs.date)) === true) {
      invalid.push('Date field is invalid.');
    }

    // Checks for valid surgery type
    if (attrs.surgery === null) {				// 0 is the dropdownlist value for not selected
      invalid.push('Surgery field is required.');
    }

    // Checks for valid surgery location
    if (attrs.location === null) {			// 0 is the dropdownlist value for not selected
      invalid.push('Location field is required.');
    }

    // Checks for valid user
    if (attrs.user === null) {			// 0 is the dropdownlist value for not selected
      invalid.push('User field is required.');
    }

    // Returns invalid field(s)
    if (invalid.length > 0) {
      return invalid;
    }
  }

});

window.SurgeryInfo = Backbone.Collection.extend({
  model: Surgery,
  localStorage: new Backbone.LocalStorage('surgery-info'),
  getSurgeryInfo: function () {
    var info;

    info = LocalStorageAdapter.getJSON('surgery-info-1');
    return info;
  },
  updateSurgeryInfo: function (data) {
    LocalStorageAdapter.setJSON('surgery-info-1', data);
    console.log('surgery info updated.');
  }

});