window.Doctor = Backbone.Model.extend({
  urlRoot: '/api/team/doctors.json',
  defaults: {
    'id': 0,
    'name_first': '',
    'name_middle': '',
    'name_last': '',
    'name_suffix': '',
    'title': '',
    'clinic_location': '',
    'email': '',
    'phone': '',
    'fax': '',
    'languages': '',
    'hospital': '',
    'education': '',
    'education_html': '',
    'responsibilities': '',
    'responsibilities_html': '',
    'clinical_interests': '',
    'clinical_interests_html': '',
    'image_type': '',
    'image_data': null,
    'image_checksum': '',
    'updated_at': null
  }

});

window.Doctors = Backbone.Collection.extend({
  model: Doctor,
  localStorage: new Backbone.LocalStorage('doctors-collection'),
  getCollection: function (callback) {
    var collection;

    collection = LocalStorageAdapter.getCollection('doctors-collection');
    
     var thisHolder = this;
    SQLiteAdapter.getAllImages('doctors-collection',
            function (images) {
              var collectionWithImages = thisHolder.addImagesToCollection(collection, images);
              callback(new Doctors(collectionWithImages));
            },
            function (message) {
              console.error("error Retrieving all images:" + message);
            });
  },
  addImagesToCollection: function (collection, images) {
    for (var i = 0; i < images.length; i++) {
      for (var c = 0; c < collection.length; c++) {
        if (collection[c].id === images[i].id) {
          collection[c].image_data = images[i].data;
          collection[c].image_checksum = images[i].check_sum;
          collection[c].image_type = images[i].type;
          continue;
        }
      }
    }
    return collection;
  },
  getDoctor: function (id,callback) {
    var doctor;

    doctor = LocalStorageAdapter.getJSON('doctors-collection-' + id);
    
    SQLiteAdapter.getImage('doctors-collection-' + id,
            function (image) {
              doctor.image_data = image.data;
              doctor.image_checksum = image.check_sum;
              doctor.image_type = image.type;
              callback(new Doctor(doctor));
            },
            function () {
              console.error("failed to retrieve image");
              callback(new Doctor(doctor));
            });
    return ;
  },
  setDoctorImage: function (id, checksum, image_data) {
    var doctorImage;

    doctorImage = LocalStorageAdapter.getJSON('doctors-collection-' + id);

    doctorImage.image_checksum = checksum;
    doctorImage.image_data = image_data;

    LocalStorageAdapter.setJSON('doctors-collection-' + id, doctorImage);
  },
  findItem: function (searchText) {
    var collection,
            sorted,
            results = [],
            fullName,
            search,
            i;

    if (searchText.trim() !== '') {
      collection = LocalStorageAdapter.getCollection('doctors-collection');
      sorted = _.sortBy(_.sortBy(_.sortBy(collection, 'name_middle'), 'name_first'), 'name_last');
      search = searchText.toLowerCase();

      for (i = 0; i < sorted.length; i++) {
        fullName = sorted[i].name_last + ', ' + sorted[i].name_first + (sorted[i].name_middle !== '' ? ' ' + sorted[i].name_middle : '');
        if (fullName.toLowerCase().indexOf(search) > -1) {
          results.push(sorted[i]);
        }
      }
    }
    this.reset(results);
  }

});