window.NotesView = Backbone.View.extend({
  initialize: function () {
    this.is_edit = false;
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'destroy', this.render);
  },
  serializeData: function () {
    var data = {};

    data.title = 'Notes';
    data.editText = 'Edit';
    data.doneText = 'Done';
    data.emptyText = 'No notes found.';
    data.is_edit = this.is_edit;
    data.notesArr = _.sortBy(this.collection.toJSON(), 'updated_at').reverse();
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  events: {
    'click #btnEdit': 'toggleNotes',
    'click #btnDone': 'toggleNotes',
    'click .table-view-cell .btn-delete ': 'deleteNote'
  },
  toggleNotes: function () {
    var is_edit;
    this.is_edit = !this.is_edit;
    this.render();
  },
  deleteNote: function (e) {
    var id,
            note,
            notes;

    e.preventDefault();

    notes = this.collection;
    id = $(e.currentTarget).data('id');

    var removeNote = function () {
      note = notes.get(id);
      note.destroy();
    };

    DialogAdapter.showConfirm('Are you sure you want to delete note?', function (isConfirm) {
      if (isConfirm === true) {
        removeNote();
      }
    });
  }

});

window.NoteView = Backbone.View.extend({
  initialize: function (attrs) {
    this.model = attrs.model || {};
    this.collection = attrs.collection || [];
    this.is_dirty = false;
  },
  events: {
    'click #btnSave': 'saveNote',
    'click #btnCancel': 'cancelNote',
    'click #btnDelete': 'removeImage',
    'click #btnCapture': 'captureImage',
  },
  serializeData: function () {
    var data = {};

    data.title = 'Note';
    data.note = this.model.toJSON();
    data.saveText = 'Save';
    data.cancelText = 'Cancel';
    data.isShowCamera = ApplicationHelper.isNative();
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  captureImage: function (e) {
    var img,
            btn,
            img_data;

    e.preventDefault();

    if (CameraAdapter.isSupported() === true) {
      SpinAdapter.show();
      CameraAdapter.getPicture(function (imageData) {
        console.log('capturing picture');
        img = document.getElementById('imgCapture');
        img.src = 'data:image/jpeg;base64,' + imageData;
        this.img_data = imageData;
        this.is_dirty = true;
        $('#imgCapture').show();
        $('#btnDelete').show();
        $('#btnCapture').hide();
        SpinAdapter.hide();
      }.bind(this), function (message) {
        console.log('Error encountered: ' + message);
        SpinAdapter.hide();
      }, {
        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL
      });
    } else {
      DialogAdapter.showMessage('Camera not found on device.');
    }

  },
  removeImage: function (e) {
    var area,
            img;

    DialogAdapter.showConfirm('Are you sure you want to delete?', function (isConfirm) {
      if (isConfirm === true) {
        img = document.getElementById('imgCapture');
        img.src = '#';
        this.img_data = null;
        $('#imgCapture').hide();
        $('#btnDelete').hide();
        $('#btnCapture').show();
      }
    }).bind(this);
  },
  saveNote: function (e) {
    var formData,
            note,
            errors = [],
            message,
            i;

    e.preventDefault();

    formData = {
      title: $("#txtTitle").val().trim(),
      content_html: $("#txtNote").val().trim(),
      img_data: this.img_data
    };

    note = new Note();
    errors = note.validate(formData);

    if (errors) {
      message = 'Errors encountered:\n';
      for (i = 0; i < errors.length; i++) {
        message += ' - ' + errors[i] + '\n';
      }
      console.log(message);
      DialogAdapter.showMessage(message);

    } else {
      console.log('Saving notes.');

      formData.updated_at = new Date();

      if (parseInt(this.model.id) === 0) {
        formData.id = LocalStorageAdapter.generateNumberId('notes-collection');
        note = new Note(formData);
        this.collection.add(note);
        note.save();
      } else {
        this.model.save(formData);
      }
      this.goToNotes();
    }
  },
  cancelNote: function (e) {
    var title,
            content_html,
            original,
            i,
            is_dirty,
            is_show_img;

    e.preventDefault();

    original = this.model.toJSON();

    title = $("#txtTitle").val();
    content_html = $("#txtNote").val();

    is_dirty = this.is_dirty;
    is_show_img = $('#imgCapture').is(":visible");

    if (is_dirty !== true) {
      if (original.title !== title || original.content_html !== content_html) {
        is_dirty = true;
        console.log('title or content does not match');
      }
      if (original.img_data !== null && is_show_img === false) {
        is_dirty = true;
        console.log('img deleted');
      }
    } else {
      console.log('img added');
    }

    var goToNotes = this.goToNotes;
    if (is_dirty === true) {
      DialogAdapter.showConfirm('Changes were not saved. Are you sure you would like to cancel?', function (isConfirm) {
        if (isConfirm === true) {
          goToNotes();
        }
      });
    } else {
      this.goToNotes();
    }
  },
  goToNotes: function () {
    

    
    router.navigate('notes', {trigger: true});
  }

});