window.StaffMember = Backbone.Model.extend({
  urlRoot: '/api/team/clinic_staffs.json',
  defaults: {
    'id': 0,
    'name_first': '',
    'name_middle': '',
    'name_last': '',
    'name_suffix': '',
    'role': '',
    'updated_at': null
  }

});

window.Staff = Backbone.Collection.extend({
  model: StaffMember,
  localStorage: new Backbone.LocalStorage('staff-collection'),
  getCollection: function () {
    var collection;

    collection = LocalStorageAdapter.getCollection('staff-collection');
    return new Staff(collection);
  },
  getStaffMember: function (id) {
    var staffMember;

    staffMember = LocalStorageAdapter.getJSON('staff-collection-' + id);
    return new StaffMember(staffMember);
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
      collection = LocalStorageAdapter.getCollection('staff-collection');
      sorted = _.sortBy(_.sortBy(_.sortBy(collection, 'name_middle'), 'name_first'), 'name_last');
      search = searchText.toLowerCase();

      for (i = 0; i < sorted.length; i++) {
        fullName = sorted[i].name_last + ', ' + sorted[i].name_first + (sorted[i].name_middle !== '' ? ' ' + sorted[i].name_middle : '');
        isNameMatch = fullName.toLowerCase().indexOf(search) > -1;
        isRoleMatch = sorted[i].role.toLowerCase().indexOf(search) > -1;
        if (isNameMatch || isRoleMatch) {
          results.push(sorted[i]);
        }
      }
    }
    this.reset(results);
  }

});