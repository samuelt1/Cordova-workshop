window.Coordinator = Backbone.Model.extend({
  urlRoot: '/api/team/coordinators.json',
  defaults: {
    'id': 0,
    'name_first': '',
    'name_middle': '',
    'name_last': '',
    'name_suffix': '',
    'email': '',
    'phone': '',
    'fax': '',
    'team_doctors': [],
    'updated_at': null
  }

});

window.Coordinators = Backbone.Collection.extend({
  model: Coordinator,
  localStorage: new Backbone.LocalStorage('coordinators-collection'),
  getCollection: function () {
    var collection;

    collection = LocalStorageAdapter.getCollection('coordinators-collection');
    return new Coordinators(collection);
  },
  getCoordinator: function (id) {
    var coordinator;

    coordinator = LocalStorageAdapter.getJSON('coordinators-collection-' + id);
    return new Coordinator(coordinator);
  },
  findItem: function (searchText) {
    var collection,
            sorted,
            results = [],
            fullName,
            search,
            isNameMatch,
            doctorFullName,
            isDoctor,
            i,
            j;

    if (searchText.trim() !== '') {
      collection = LocalStorageAdapter.getCollection('coordinators-collection');
      sorted = _.sortBy(_.sortBy(_.sortBy(collection, 'name_middle'), 'name_first'), 'name_last');
      search = searchText.toLowerCase();

      for (i = 0; i < sorted.length; i++) {
        fullName = sorted[i].name_last + ', ' + sorted[i].name_first + (sorted[i].name_middle !== '' ? ' ' + sorted[i].name_middle : '');
        isNameMatch = fullName.toLowerCase().indexOf(search) > -1;
        isDoctor = false;
        for (j = 0; j < sorted[i].team_doctors.length; j++) {
          doctorFullName = sorted[i].team_doctors[j].name_last + ', ' + sorted[i].team_doctors[j].name_first + (sorted[i].team_doctors[j].name_middle !== '' ? ' ' + sorted[i].team_doctors[j].name_middle : '');

          if (doctorFullName.toLowerCase().indexOf(search) > -1) {
            isDoctor = true;
          }
        }
        if (isNameMatch || isDoctor) {
          results.push(sorted[i]);
        }
      }
    }
    this.reset(results);
  }

});