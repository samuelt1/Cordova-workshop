window.HospitalView = Backbone.View.extend({
  initialize: function (attrs) {
    this.hospital_id = attrs.hospital_id || Config.HOSPITAL_DEFAULT;
  },
  events: {
    'click #tabWestwood': 'switchTabs',
    'click #tabSantaMonica': 'switchTabs',
  },
  serializeData: function () {
    var data = {},
            hospitalInfo;

    hospitalInfo = [
      {id: 'transportation', label: 'Address and Contact Information'},
      {id: 'floors', label: 'Floor Maps'},
      {id: 'directions', label: 'Directions and Parking'}
    ];

    data.title = 'Hospital Information';
    data.hospital_id = parseInt(this.hospital_id);
    data.emptyText = 'No hospital info found.';
    data.hospitalInfo = hospitalInfo;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  switchTabs: function (e) {
    

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    
    router.navigate('#contact/' + id + '/hospital', {trigger: true, replace: true});
  }

});