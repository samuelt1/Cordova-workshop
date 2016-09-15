window.DepartmentView = Backbone.View.extend({
  initialize: function (attrs) {
    this.model = attrs.model || {};
  },
  events: {
    'click #tabWestwood': 'switchTabs',
    'click #tabSantaMonica': 'switchTabs',
  },
  serializeData: function () {
    var data = {},
            contact;

    contact = this.model;

    data.title = 'Outpatient Clinic Information';
    data.hospital_id = parseInt(this.model.hospital_id);
    data.emptyText = 'No contact info found.';
    data.info = contact.dept_info;
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  switchTabs: function (e) {
    

    e.preventDefault();
    id = $(e.currentTarget).data('id');

    
    router.navigate('#contact/' + id + '/department', {trigger: true, replace: true});
  }

});