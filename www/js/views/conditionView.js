window.ConditionsView = Backbone.View.extend({
  initialize: function (attrs) {
    this.collection = attrs.collection || [];
    this.filtered = attrs.collection ? attrs.collection.toJSON() : [];
    this.searched = '';
    this.results = new Conditions(this.collection);
    this.searchConditionsView = new SearchConditionsView({collection: this.results, urlRoot: 'conditions'});
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'change', this.render);

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

    data.conditions = _.sortBy(this.filtered, 'name');
    data.searched = this.searched;
    data.searchText = 'Search Conditions...';
    data.emptyText = 'No conditions found.';
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    $('.search-results', this.el).append(this.searchConditionsView.render().el);
    return this;
  },
  checkServer: function () {
    var collection,
            current,
            updated,
            elapsed,
            render,
            now;

    collection = this.collection;
    render = this.render;
    current = LocalStorageAdapter.getCollectionEtagInfo('conditions-collection');
    updated = typeof (current) !== 'undefined' ? new Date(current.updated_at) : new Date();
    elapsed = new Date(updated.getTime() + Config.UPDATE_CHECK.HOURS * 60 * 60 * 1000);
    now = new Date();

    if (typeof (current) === 'undefined') {
      SpinAdapter.show();
      ServiceAdapter.getConditions(function (data, etag) {
        LocalStorageAdapter.clearCollection('conditions-collection');
        LocalStorageAdapter.setCollection('conditions-collection', data, etag);
        collection.reset(data);
        SpinAdapter.hide();
        Backbone.history.loadUrl(Backbone.history.fragment);
      });
    } else if (elapsed.getTime() < now.getTime()) {
      console.log('Checking for conditions updates.');
      ServiceAdapter.getConditions(function (data, etag) {
        if (current.etag !== etag) {
          SpinAdapter.show();
          LocalStorageAdapter.clearCollection('conditions-collection');
          LocalStorageAdapter.setCollection('conditions-collection', data, etag);
          collection.reset(data);
          DialogAdapter.showMessage('Conditions have been updated.', function () {
            SpinAdapter.hide();
            Backbone.history.loadUrl(Backbone.history.fragment);
          });
        } else {
          console.log('Conditions already updated.');
        }
      });
    } else {
      console.log('Conditions recently updated.');
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
            i,
            j;

    this.searched = searchText;
    collection = this.collection.toJSON();
    $('.search-results').removeClass('show');
    search = searchText.toLowerCase();
    for (i = 0; i < collection.length; i++) {
      // .contains() only works in web, use .indexOf()
      if (collection[i].name.toLowerCase().indexOf(search) > -1) {
        results.push(collection[i]);
      } else {
        for (j = 0; j < collection[i].condition_tags.length; j++) {
          if (collection[i].condition_tags[j].value.toLowerCase().indexOf(search) > -1) {
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

window.ConditionView = Backbone.View.extend({
  initialize: function (attrs) {

    this.model = attrs.model;
    if (parseInt(this.model.id) === 0) {
      DialogAdapter.showMessage('Condition not found.', this.goToConditions);
    }
  },
  serializeData: function () {
    var data = {},
            c_tags = [],
            tags,
            i;

    data.condition = this.model.toJSON();

    c_tags = _.sortBy(data.condition.condition_tags, 'value');
    for (i = 0; i < c_tags.length; i++) {
      if (i === 0) {
        tags = c_tags[i].value;
      } else {
        tags += ', ' + c_tags[i].value;
      }
    }
    data.tags = tags;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  goToConditions: function () {
    

    
    router.navigate('conditions', {trigger: true});
  }

})