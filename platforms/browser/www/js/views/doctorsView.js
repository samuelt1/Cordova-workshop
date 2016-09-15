window.DoctorsView = Backbone.View.extend({
  initialize: function (attrs) {
    this.collection = attrs.collection || [];
    this.filtered = attrs.collection ? attrs.collection.toJSON() : [];
    this.searched = '';
    this.results = new Doctors(this.collection);
    this.searchPeopleView = new SearchPeopleView({collection: this.results, urlRoot: 'team/doctors'});

    if (NetworkAdapter.isConnected() === true) {
      this.checkServer();
    } else {
      if (this.filtered.length === 0) {
        DialogAdapter.showMessage('No network connection detected. Contents cannot be downloaded.');
      }
    }
  },
  events: {
    'keyup .search-query': 'search',
    'keypress .search-query': 'onkeypress',
    'click .search-button': 'searchClick'
  },
  serializeData: function () {
    var data = {};

    data.searchText = 'Search Doctors...';
    data.emptyText = 'No Doctors found.';
    data.doctors = _.sortBy(_.sortBy(this.filtered, 'name_first'), 'name_last');
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    $('.search-results', this.el).append(this.searchPeopleView.render().el);
    return this;
  },
  checkServer: function () {
    var collection,
            current,
            updated,
            elapsed,
            now,
            deferreds = [],
            doctors,
            doctor,
            i;

    doctors = new Doctors();
    collection = this.collection;
    current = LocalStorageAdapter.getCollectionEtagInfo('doctors-collection');
    updated = typeof (current) !== 'undefined' ? new Date(current.updated_at) : new Date();
    elapsed = new Date(updated.getTime() + Config.UPDATE_CHECK.HOURS * 60 * 60 * 1000);
    now = new Date();

    if (typeof (current) === 'undefined') {
      console.log('initializing doctors.');
      SpinAdapter.show();
      ServiceAdapter.getDoctors(function (data, etag) {
        LocalStorageAdapter.clearCollectionWithImages('doctors-collection');
        LocalStorageAdapter.setCollectionWithImages('doctors-collection', data, etag);
        collection.reset(data);


        SpinAdapter.hide();
        DialogAdapter.showMessage('Doctors have been downloaded.', function () {
          Backbone.history.loadUrl(Backbone.history.fragment);
        });
      });
    } else if (elapsed.getTime() < now.getTime()) {
      console.log('checking for doctors updates.');
      ServiceAdapter.getDoctors(function (data, etag) {
        if (current.etag !== etag) {
          SpinAdapter.show();
          LocalStorageAdapter.clearCollectionWithImages('doctors-collection');
          LocalStorageAdapter.setCollectionWithImages('doctors-collection', data, etag);
          collection.reset(data);

          SpinAdapter.hide();
          DialogAdapter.showMessage('doctors has been updated.', function () {
            Backbone.history.loadUrl(Backbone.history.fragment);
          });
        } else {
          console.log('doctors already updated.');
        }
      });
    } else {
      console.log('doctors recently updated.');
    }

  },
  search: function () {
    var key;

    key = $('#txtSearch').val();
    this.results.findItem(key);

    if (key.trim() !== '') {
      setTimeout(function () {
        $('.search-results').addClass('show');
      }, 500);
    } else {
      $('.search-results').removeClass('show');
    }
  },
  searchClick: function () {
    var key;

    key = $('#txtSearch').val();
    this.filter(key);
  },
  filter: function (searchText) {
    var collection,
            results = [],
            search,
            i;

    this.searched = searchText;
    collection = this.collection.toJSON();
    $('.search-results').removeClass('show');
    search = searchText.toLowerCase();
    for (i = 0; i < collection.length; i++) {
      // .contains() only works in web, use .indexOf()
      if (collection[i].name_first.toLowerCase().indexOf(search) > -1 || collection[i].name_last.toLowerCase().indexOf(search) > -1 || collection[i].name_middle.toLowerCase().indexOf(search) > -1) {
        results.push(collection[i]);
      }
    }

    this.filtered = results;
    this.render();
  },
  onkeypress: function (event) {
    var key;

    if (event.keyCode === 13) {
      event.preventDefault();
      this.searchClick();
    }
  }

});

window.DoctorView = Backbone.View.extend({
  initialize: function (attrs) {
    this.model = attrs.model;

    if (parseInt(this.model.id) === 0) {
      DialogAdapter.showMessage('Doctor not found.', this.goToDoctors);
    }
  },
  serializeData: function () {
    var data = {};

    data.doctor = this.model.toJSON();
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  goToDoctors: function () {



    router.navigate('team/doctors', {trigger: true});
  }

});