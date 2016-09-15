window.Note = Backbone.Model.extend({
  url: 'notes-collection',
  defaults: {
    'id': 0,
    'title': '',
    'content_html': '',
    'img_data': null,
    'updated_at': null
  },
  validate: function (attrs) {
    var invalid = [];

    // Checks for valid title
    if (attrs.title === '') {
      invalid.push('Title field is required.');
    }

    // Checks for valid content
    if (attrs.content_html === '') {
      invalid.push('Notes field is required.');
    }

    // Returns invalid field(s)
    if (invalid.length > 0) {
      return invalid;
    }
  }

});

window.Notes = Backbone.Collection.extend({
  model: Note,
  localStorage: new Backbone.LocalStorage('notes-collection'),
  clear: function () {
    console.log('Clearing all notifications.');
    LocalStorageAdapter.clearCollection('notes-collection');
  },
});