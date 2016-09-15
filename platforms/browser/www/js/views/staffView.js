window.StaffView = Backbone.View.extend({
  initialize: function (attrs) {
    this.collection = attrs.collection || {};
    this.filtered = attrs.collection ? attrs.collection.toJSON() : [];
    this.searched = '';
    this.results = new Staff(this.collection);
    this.searchPeopleView = new SearchPeopleView({collection: this.results, urlRoot: 'team/staff'});

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

    data.searchText = 'Search Clinic Staff...';
    data.emptyText = 'No Clinic Staff found.';
    data.staff = _.sortBy(_.sortBy(this.filtered, 'name_first'), 'name_last');
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
    current = LocalStorageAdapter.getCollectionEtagInfo('staff-collection');
    updated = typeof (current) !== 'undefined' ? new Date(current.updated_at) : new Date();
    elapsed = new Date(updated.getTime() + Config.UPDATE_CHECK.HOURS * 60 * 60 * 1000);
    now = new Date();

    if (typeof (current) === 'undefined') {
      console.log('initializing staff.');
      SpinAdapter.show();
      ServiceAdapter.getStaff(function (data, etag) {
        LocalStorageAdapter.clearCollection('staff-collection');
        LocalStorageAdapter.setCollection('staff-collection', data, etag);
        collection.reset(data);
        SpinAdapter.hide();
        Backbone.history.loadUrl(Backbone.history.fragment);
      });
    } else if (elapsed.getTime() < now.getTime()) {
      console.log('checking for staff updates.');
      ServiceAdapter.getStaff(function (data, etag) {
        if (current !== etag) {
          SpinAdapter.show();
          LocalStorageAdapter.clearCollection('staff-collection');
          LocalStorageAdapter.setCollection('staff-collection', data, etag);
          collection.reset(data);
          DialogAdapter.showMessage('staff has been updated.', function () {
            SpinAdapter.hide();
            Backbone.history.loadUrl(Backbone.history.fragment);
          });
        } else {
          console.log('staff already updated.');
        }
      });
    } else {
      console.log('staff recently updated.');
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

window.StaffMemberView = Backbone.View.extend({
  initialize: function (attrs) {
    this.model = attrs.model;

    if (parseInt(this.model.id) === 0) {
      DialogAdapter.showMessage('Staff not found.', this.goToStaff);
    }
  },
  serializeData: function () {
    var data = {};

    data.staff_member = this.model.toJSON();
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  goToStaff: function () {
    

    
    router.navigate('team/staff', {trigger: true});
  }

});