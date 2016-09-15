window.Condition = Backbone.Model.extend({
  urlRoot: "https://localhost:8443/api/conditions.json",
  defaults: {
    'id': 0,
    'name': '',
    'content_html': '',
    'condition_tags': [],
    'updated_at': null
  }

});

window.Conditions = Backbone.Collection.extend({
  model: Condition,
  localStorage: new Backbone.LocalStorage('conditions-collection'),
  getCollection: function () {
    var collection;

    collection = LocalStorageAdapter.getCollection('conditions-collection');
    return new Conditions(collection);
  },
  getCondition: function (id) {
    var condition;

    condition = LocalStorageAdapter.getJSON('conditions-collection-' + id);
    return new Condition(condition);
  },
  findItem: function (searchText) {
    var collection,
            sorted,
            results = [],
            isNameMatch,
            isTagMatch,
            search,
            i,
            j;

    if (searchText.trim() !== '') {
      collection = LocalStorageAdapter.getCollection('conditions-collection');
      sorted = _.sortBy(collection, 'name');
      search = searchText.toLowerCase();

      for (i = 0; i < sorted.length; i++) {
        isNameMatch = sorted[i].name.toLowerCase().indexOf(search) > -1;
        isTag = false;
        for (j = 0; j < sorted[i].condition_tags.length; j++) {
          if (sorted[i].condition_tags[j].value.toLowerCase().indexOf(search) > -1) {
            isTag = true;
          }
        }
        if (isNameMatch || isTag) {
          results.push(sorted[i]);
        }
      }
    }
    this.reset(results);
  }

});