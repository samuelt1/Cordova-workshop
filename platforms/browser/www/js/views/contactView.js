window.ContactView = Backbone.View.extend({
  initialize: function (attrs) {
    this.hospital_id = attrs.hospital_id;
  },
  events: {
    'click #tabWestwood': 'switchTabs',
    'click #tabSantaMonica': 'switchTabs',
  },
  serializeData: function () {
    var data = {},
            contacts;

    contacts = [
      {key: 'department', name: 'Outpatient Clinic Information'},
      {key: 'hospital', name: 'Hospital Information'},
      {key: 'social-media', name: 'Social Media'}
    ];

    data.title = 'Contact';
    data.hospital_id = parseInt(this.hospital_id);
    data.emptyText = 'No contact info found.';
    data.contacts = contacts;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  switchTabs: function (e) {
    

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    
    router.navigate('#contact/' + id, {trigger: true, replace: true});
  }

});