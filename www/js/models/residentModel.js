window.Resident = Backbone.Model.extend({
  //urlRoot: 'http://localhost:3000/admin/team/residents/api',
  urlRoot: 'api/team/residents.json',
  defaults: {
    'id': 0,
    'name_first': '',
    'name_middle': '',
    'name_last': '',
    'name_suffix': '',
    'year_started': '',
    'education': '',
    'education_html': '',
    'image_type': '',
    'image_data': null,
    'image_checksum': '',
    'updated_at': null
  }

});

window.Residents = Backbone.Collection.extend({
  model: Resident,
  localStorage: new Backbone.LocalStorage('residents-collection'),
  getCollection: function (callback) {
    var collection;

    collection = LocalStorageAdapter.getCollection('residents-collection');
    var thisHolder = this;
    SQLiteAdapter.getAllImages('residents-collection',
            function (images) {
              var collectionWithImages = thisHolder.addImagesToCollection(collection, images);
              callback(new Residents(collectionWithImages));
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
  getResident: function (id, callback) {
    var resident;

    resident = LocalStorageAdapter.getJSON('residents-collection-' + id);
    SQLiteAdapter.getImage('residents-collection-' + id,
            function (image) {
              resident.image_data = image.data;
              resident.image_checksum = image.check_sum;
              resident.image_type = image.type;
              callback(new Resident(resident));
            },
            function () {
              console.error("failed to retrieve image");
              callback(new Resident(resident));
            });
  },
  setResidentImage: function (id, checksum, image_data) {
    var residentImage;

    residentImage = LocalStorageAdapter.getJSON('residents-collection-' + id);

    residentImage.image_checksum = checksum;
    residentImage.image_data = image_data;

    LocalStorageAdapter.setJSON('residents-collection-' + id, residentImage);
  },
  findItem: function (searchText) {
    var collection,
            sorted,
            results = [],
            fullName,
            search,
            i;

    if (searchText.trim() !== '') {
      collection = LocalStorageAdapter.getCollection('residents-collection');
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