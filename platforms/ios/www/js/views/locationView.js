window.LocationView = Backbone.View.extend({
  initialize: function (attrs) {
    this.hospital_id = attrs.hospital_id;
    this.category_id = attrs.category_id;
    this.location = attrs.location;
    this.is_native = ApplicationHelper.isNative();
  },
  serializeData: function () {
    var data = {},
            hospital_id,
            url,
            origin = {},
            destination = {},
            zoom,
            mapType,
            size;

    hospital_id = parseInt(this.hospital_id);
    url = 'https://maps.googleapis.com/maps/api/staticmap';

    if (hospital_id === 1) {
      origin = {
        color: 'red',
        latitude: Config.FACILITIES.LOCATIONS[0].latitude,
        longitude: Config.FACILITIES.LOCATIONS[0].longitude
      };
    } else {
      origin = {
        color: 'red',
        latitude: Config.FACILITIES.LOCATIONS[1].latitude,
        longitude: Config.FACILITIES.LOCATIONS[1].longitude
      };
    }

    destination = {
      color: 'blue',
      latitude: this.location.geometry.location.lat(),
      longitude: this.location.geometry.location.lng()
    };

    zoom = '16';
    mapType = 'roadmap';
    size = '600x600';

    data.name = this.location.name;
    data.map = url
            + '?center=' + ((origin.latitude + destination.latitude) / 2) + ',' + ((origin.longitude + destination.longitude) / 2)
            + '&zoom=' + zoom
            + '&size=' + size
            + '&maptype=' + mapType
            + '&markers=' + 'color:' + origin.color + '%7C' + origin.latitude + ',' + origin.longitude
            + '&markers=' + 'color:' + destination.color + '%7C' + destination.latitude + ',' + destination.longitude
            + '&rankBy=distance';
    data.is_native = this.is_native === true;
    data.coord = destination.latitude + ',' + destination.longitude;
    data.address = this.location.vicinity;
    data.phone = this.location.formatted_phone_number;
    data.hours = this.location.opening_hours ? this.location.opening_hours.weekday_text : [];

    return data;
  },
  render: function () {
    SpinAdapter.show();
    $(this.el).html(this.template(this.serializeData()));
    SpinAdapter.hide();
    return this;
  }

});