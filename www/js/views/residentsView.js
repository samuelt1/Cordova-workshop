window.ResidentsView = Backbone.View.extend({
  initialize: function (attrs) {
    this.collection = attrs.collection || [];
    this.filtered = attrs.collection ? attrs.collection.toJSON() : [];
    this.searched = '';
    this.results = new Residents(this.collection);
    this.searchPeopleView = new SearchPeopleView({collection: this.results, urlRoot: 'team/residents'});

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

    data.searchText = 'Search Residents...';
    data.emptyText = 'No Residents found.';
    data.residents = _.sortBy(_.sortBy(this.filtered, 'name_first'), 'name_last');
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
            residents,
            resident,
            i;

    residents = new Residents();
    collection = this.collection;
    current = LocalStorageAdapter.getCollectionEtagInfo('residents-collection');
    updated = typeof (current) !== 'undefined' ? new Date(current.updated_at) : new Date();
    elapsed = new Date(updated.getTime() + Config.UPDATE_CHECK.HOURS * 60 * 60 * 1000);
    now = new Date();

    if (typeof (current) === 'undefined') {
      console.log('initializing residents.');
      SpinAdapter.show();
      ServiceAdapter.getResidents(function (data, etag) {
        LocalStorageAdapter.clearCollectionWithImages('residents-collection');
        LocalStorageAdapter.setCollectionWithImages('residents-collection', data, etag);
        collection.reset(data);

        SpinAdapter.hide();
        DialogAdapter.showMessage('Residents have been downloaded.', function () {
          Backbone.history.loadUrl(Backbone.history.fragment);
        });
      });
    } else if (elapsed.getTime() < now.getTime()) {
      console.log('checking for residents updates.');
      ServiceAdapter.getResidents(function (data, etag) {
        if (current.etag !== etag) {
          SpinAdapter.show();
          LocalStorageAdapter.clearCollectionWithImages('residents-collection');
          LocalStorageAdapter.setCollectionWithImages('residents-collection', data, etag);
          collection.reset(data);

          SpinAdapter.hide();
          DialogAdapter.showMessage('residents has been updated.', function () {
            Backbone.history.loadUrl(Backbone.history.fragment);
          });
        } else {
          console.log('residents already updated.');
        }
      });
    } else {
      console.log('residents recently updated.');
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

window.ResidentView = Backbone.View.extend({
  initialize: function (attrs) {
    this.model = attrs.model;

    if (parseInt(this.model.id) === 0) {
      DialogAdapter.showMessage('Resident not found.', this.goToResidents);
    }
  },
  serializeData: function () {
    var data = {};

    data.resident = this.model.toJSON();
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  goToResidents: function () {


    router.navigate('team/residents', {trigger: true});
  }

});