window.FloorsView = Backbone.View.extend({
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
            contact,
            floors = [];

    contact = this.model;
    floors = this.facility === 'clinic' ? contact.clinic_info.floors : contact.hospital_info.floors;

    data.title = ApplicationHelper.capitalizeFirstLetter(this.facility) + ' Floor Maps';
    data.hospital_id = parseInt(contact.hospital_id);
    data.facility = this.facility;
    data.floors = floors;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  switchTabs: function (e) {
    

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    
    router.navigate('#contact/' + id + '/' + this.facility + '/floors', {trigger: true, replace: true});
  }

});