window.ClinicView = Backbone.View.extend({
  initialize: function (attrs) {
    this.hospital_id = attrs.hospital_id || Config.HOSPITAL_DEFAULT;
  },
  events: {
    'click #tabWestwood': 'switchTabs',
    'click #tabSantaMonica': 'switchTabs',
  },
  serializeData: function () {
    var data = {},
            clinicInfo;

    clinicInfo = [
      {id: 'transportation', label: 'Maps and Transportation'},
      {id: 'floors', label: 'Floor Maps'},
      {id: 'directions', label: 'Directions and Parking'}
    ];

    data.title = 'Clinic Info';
    data.hospital_id = parseInt(this.hospital_id);
    data.emptyText = 'No clinic info found.';
    data.clinicInfo = clinicInfo;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  switchTabs: function (e) {
    

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    
    router.navigate('#contact/' + id + '/clinic', {trigger: true, replace: true});
  }

});