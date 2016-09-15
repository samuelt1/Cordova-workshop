window.TransportationView = Backbone.View.extend({
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
    data.title = 'Address and Contact Information';
    data.hospital_id = parseInt(contact.hospital_id);
    data.img = this.facility === 'clinic' ? contact.clinic_info.transportation.img : contact.hospital_info.transportation.img;
    data.content = this.facility === 'clinic' ? contact.clinic_info.transportation.content : contact.hospital_info.transportation.content;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  switchTabs: function (e) {
    

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    
    router.navigate('#contact/' + id + '/' + this.facility + '/transportation', {trigger: true, replace: true});
  }

});