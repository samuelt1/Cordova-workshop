window.TeamView = Backbone.View.extend({
  initialize: function () {},
  serializeData: function () {
    var data = {};

    data.title = 'Team';
    data.emptyText = 'No Team Members found.';
    data.team = [
      {id: 'doctors', label: 'Doctors'},
      {id: 'residents', label: 'Residents'},
      {id: 'coordinators', label: 'Patient Care Coordinators'},
      {id: 'staff', label: 'Clinic Staff'},
      {id: 'care_provider_roles', label: 'Care Provider Roles'},
    ];

    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  }

});