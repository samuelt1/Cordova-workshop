window.CoordinatorsView = Backbone.View.extend({
  initialize: function (attrs) {
    this.collection = attrs.collection || {};
    this.filtered = attrs.collection ? attrs.collection.toJSON() : [];
    this.searched = '';
    this.results = new Coordinators(this.collection);
    this.searchPeopleView = new SearchPeopleView({collection: this.results, urlRoot: 'team/coordinators'});

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

    data.searchText = 'Search Patient Care Coordinators...';
    data.emptyText = 'No Patient Care Coordinators found.';
    data.coordinators = _.sortBy(_.sortBy(this.filtered, 'name_first'), 'name_last');
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
            now;

    collection = this.collection;
    current = LocalStorageAdapter.getCollectionEtagInfo('coordinators-collection');
    updated = typeof (current) !== 'undefined' ? new Date(current.updated_at) : new Date();
    elapsed = new Date(updated.getTime() + Config.UPDATE_CHECK.HOURS * 60 * 60 * 1000);
    now = new Date();

    if (typeof (current) === 'undefined') {
      console.log('initializing coordinators.');
      SpinAdapter.show();
      ServiceAdapter.getCoordinators(function (data, etag) {
        LocalStorageAdapter.clearCollection('coordinators-collection');
        LocalStorageAdapter.setCollection('coordinators-collection', data, etag);
        collection.reset(data);
        SpinAdapter.hide();
        Backbone.history.loadUrl(Backbone.history.fragment);
      });
    } else if (elapsed.getTime() < now.getTime()) {
      console.log('checking for coordinators updates.');
      ServiceAdapter.getCoordinators(function (data, etag) {
        if (current !== etag) {
          SpinAdapter.show();
          LocalStorageAdapter.clearCollection('coordinators-collection');
          LocalStorageAdapter.setCollection('coordinators-collection', data, etag);
          collection.reset(data);
          DialogAdapter.showMessage('coordinators has been updated.', function () {
            SpinAdapter.hide();
            Backbone.history.loadUrl(Backbone.history.fragment);
          });
        } else {
          console.log('coordinators already updated.');
        }
      });
    } else {
      console.log('coordinators recently updated.');
    }

  },
  search: function () {
    var key;

    key = $('#txtSearch').val();
    this.results.findItem(key.toLowerCase());

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
            i,
            j;

    this.searched = searchText;
    collection = this.collection.toJSON();
    $('.search-results').removeClass('show');
    search = searchText.toLowerCase();
    for (i = 0; i < collection.length; i++) {
      // .contains() only works in web, use .indexOf()
      if (collection[i].name_first.toLowerCase().indexOf(search) > -1 || collection[i].name_last.toLowerCase().indexOf(search) > -1 || collection[i].name_middle.toLowerCase().indexOf(search) > -1) {
        results.push(collection[i]);
      } else {
        for (j = 0; j < collection[i].team_doctors.length; j++) {
          if (collection[i].team_doctors[j].name_first.toLowerCase().indexOf(search) > -1 || collection[i].team_doctors[j].name_last.toLowerCase().indexOf(search) > -1 || collection[i].team_doctors[j].name_middle.toLowerCase().indexOf(search) > -1) {
            results.push(collection[i]);
            break;
          }
        }
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

window.CoordinatorView = Backbone.View.extend({
  initialize: function (attrs) {
    this.model = attrs.model;

    if (parseInt(this.model.id) === 0) {
      DialogAdapter.showMessage('Coordinator not found.', this.goToCoordinators);
    }
  },
  serializeData: function () {
    var data = {};

    data.coordinator = this.model.toJSON();
    data.emptyDoctorListText = 'No associated doctors found.';
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  goToCoordinators: function () {
    

    
    router.navigate('team/coordinators', {trigger: true});
  }

});