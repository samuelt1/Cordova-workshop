window.LocalStorageAdapter = {
  initialize: function () {},
  isSupported: function () {
    var isAvailable;

    isAvailable = typeof (localStorage) !== 'undefined';

    if (isAvailable === false) {
      console.log('Local Storage is not supported.');
    }

    return isAvailable;
  },
  isSet: function (name) {
    return localStorage.getItem(name) !== null;
  },
  set: function (name, data) {
    try {
      localStorage.setItem(name, data);
    } catch (exception) {
      console.log('Error encountered while saving to local storage: ' + exception);
    }
  },
  get: function (name) {
    if (this.isSet(name)) {
      return localStorage.getItem(name);
    }
  },
  setJSON: function (name, object) {
    try {
      localStorage.setItem(name, JSON.stringify(object));
    } catch (exception) {
      console.log('Error encountered while saving to local storage: ' + exception);
    }
  },
  getJSON: function (name) {
    if (this.isSet(name)) {
      if (this.isJSON(localStorage.getItem(name))) {
        return JSON.parse(localStorage.getItem(name));
      }
    }
  },
  delete: function (name) {
    if (this.isSet(name)) {
      localStorage.removeItem(name);
    }
  },
  deleteImage: function (name) {
    if (this.isSet(name)) {
      localStorage.removeItem(name);
    }
    SQLiteAdapter.removeImage(name);
  },
  isJSON: function (str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },
  clearAll: function () {
    localStorage.clear();
    console.log('Local Storage cleared.');
  },
  /**
   * Increments the id for the specified collection and returns the new id
   *
   * @param {String} collectionName - Name of the local storage key
   *
   * @return {Int} - Next incremented id
   * 
   */
  generateNumberId: function (collectionName) {
    var key,
            i = 1;

    key = 'counter-' + collectionName;
    if (this.isSet(key)) {
      i = parseInt(this.get(key));
      i += 1;
    }
    this.set(key, i);
    return i;
  },
  resetNumberGenerator: function (collectionName) {
    var key;

    key = 'counter-' + collectionName;
    if (this.isSet(key)) {
      this.set(key, 0);
    }
  },
  getCollectionEtag: function (collectionName) {
    var key;

    key = 'etag-' + collectionName;
    return this.get(key);
  },
  setCollectionEtag: function (collectionName, etag) {
    var key;

    key = 'etag-' + collectionName;
    this.set(key, etag);
  },
  getCollectionEtagInfo: function (collectionName) {
    var key;

    key = 'etag-' + collectionName;
    return this.getJSON(key);
  },
  setCollectionEtagInfo: function (collectionName, etag) {
    var key,
            data,
            updated;

    key = 'etag-' + collectionName;
    updated = new Date();
    data = {
      'etag': etag,
      'updated_at': updated
    };
    this.setJSON(key, data);
  },
  setCollectionIds: function (collectionName, ids) {
    var key;

    key = collectionName;
    this.set(key, ids);
  },
  getCollectionImages: function (collectionName) {
    var key,
            ids,
            idArr = [],
            image,
            images = [];

    ids = this.get(collectionName);

    if (ids) {
      idArr = ids.split(',');
      for (i = 0; i < idArr.length; i++) {
        key = 'image-' + collectionName + '-' + idArr[i];
        image = this.getJSON(key);
        if (image) {
          images.push(image);
        }
      }
    }
    return images;
  },
  getCollectionImage: function (collectionName, id) {
    var key;

    key = 'image-' + collectionName + '-' + id;
    return this.getJSON(key);
  },
  setCollectionImage: function (collectionName, imageInfo) {
    var imageKey,
            collectionKey,
            details,
            dateUpdated;

    dateUpdated = new Date();

    imageKey = 'image-' + collectionName + '-' + imageInfo.id;

    details = {
      id: imageInfo.id,
      image_checksum: imageInfo.image_checksum,
      image_type: imageInfo.image_type,
      image_data: imageInfo.image_data,
      updated_at: dateUpdated
    }

    this.setJSON(imageKey, details);
  },
  getCollection: function (collectionName) {
    var collection = [],
            idArr = [],
            ids,
            key,
            i;

    ids = this.get(collectionName);
    if (ids) {
      idArr = ids.split(',');
      for (i = 0; i < idArr.length; i++) {
        key = collectionName + '-' + idArr[i];
        collection.push(this.getJSON(key));
      }
    }

    return collection;
  },
  setCollection: function (collectionName, data, etag) {
    var ids = [],
            key,
            i;

    for (i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty('id')) {
        key = collectionName + '-' + data[i]['id'];
        this.setJSON(key, data[i]);
        ids.push(data[i]['id']);
      }
    }

    this.setCollectionEtagInfo(collectionName, etag);
    this.set(collectionName, ids);
    console.log(collectionName + ' updated.');
  },
  setCollectionWithImages: function (collectionName, data, etag) {
    var ids = [],
            key,
            i;

   for (i = 0; i < data.length; i++) {
      if (data[i].hasOwnProperty('id')) {
        key = collectionName + '-' + data[i]['id'];
        SQLiteAdapter.addImage({
          id:data[i]['id'],
          key:key,
          base64:data[i].image_data,
          check_sum:data[i].image_checksum,
          type:data[i].image_type,
        });
        delete data[i].image_data;
        delete data[i].image_checksum;
        delete data[i].image_type;
        this.setJSON(key, data[i]);
        ids.push(data[i]['id']);
      }
    }

    this.setCollectionEtagInfo(collectionName, etag);
    this.set(collectionName, ids);
    console.log(collectionName + ' updated.');
  },
  clearCollectionWithImages: function (collectionName) {
    var keys,
            ids = [],
            i;

    keys = this.get(collectionName);

    if (this.isSet(collectionName)) {
      this.delete(collectionName, '');
    }

    this.resetNumberGenerator(collectionName);

    if (keys) {
      ids = keys.split(',');
      for (i = 0; i < ids.length; i++) {
        this.deleteImage(collectionName + '-' + ids[i]);
      }

      console.log(collectionName + ' cleared.');
    }
  },
  clearCollection: function (collectionName) {
    var keys,
            ids = [],
            i;

    keys = this.get(collectionName);

    if (this.isSet(collectionName)) {
      this.delete(collectionName, '');
    }

    this.resetNumberGenerator(collectionName);

    if (keys) {
      ids = keys.split(',');
      for (i = 0; i < ids.length; i++) {
        this.delete(collectionName + '-' + ids[i]);
      }

      console.log(collectionName + ' cleared.');
    }
  }

};