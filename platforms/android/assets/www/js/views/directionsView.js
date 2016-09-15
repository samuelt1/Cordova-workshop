window.DirectionsView = Backbone.View.extend({
  initialize: function (attrs) {
    this.model = attrs.model || {};
    this.facility = attrs.facility;
  },
  events: {
    'click #tabWestwood': 'switchTabs',
    'click #tabSantaMonica': 'switchTabs',
  },
  serializeData: function () {
    var data = {},
            contact;

    contact = this.model;
    data.title = 'Directions and Parking';
    data.hospital_id = parseInt(contact.hospital_id);
    data.directions = this.facility === 'clinic' ? contact.clinic_info.directions : contact.hospital_info.directions;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  switchTabs: function (e) {
    

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    
    router.navigate('#contact/' + id + '/' + this.facility + '/directions', {trigger: true, replace: true});
  }

});