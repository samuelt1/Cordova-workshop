window.FloorView = Backbone.View.extend({
  initialize: function (attrs) {
    this.model = attrs.model || {};
    this.floor_id = attrs.floor_id;
    this.facility = attrs.facility;
  },
  serializeData: function () {
    var data = {},
            contact,
            floor;

    contact = this.model;
    floor = this.getFloor();
    data.img = floor.img;
    data.title = typeof (floor) !== 'undefined' && floor.name ? floor.name : 'Floor Map';
    data.hospital_id = parseInt(contact.hospital_id);
    data.content = typeof (floor) !== 'undefined' && floor.content ? floor.content : '';
    data.table_of_contents = typeof (floor) !== 'undefined' && floor.table_of_contents ? floor.table_of_contents : '';
    return data;
  },
  render: function () {
    $(this.el).html(this.template(this.serializeData()));
    return this;
  },
  startCanvas: function () {
    var canvasArea,
            imgCanvas,
            img,
            imgUrl,
            imgHeight,
            imgWidth,
            ratio;

    canvasArea = document.getElementById('canvas-area');
    imgCanvas = document.getElementById('mycanvas');
    var img = this.getFloor().img;
    imgUrl = img.url;

    if (imgUrl) {
      imgHeight = parseFloat(img.height);
      imgWidth = parseFloat(img.width);

      var imgMap = new ImgTouchCanvas({
        canvas: imgCanvas,
        path: imgUrl
      });

      canvasArea.width = window.innerWidth - 20;
      canvasArea.height = window.innerHeight - 20;

      ratio = imgWidth < imgHeight ? (imgWidth / imgHeight) : (imgHeight / imgWidth);
      imgCanvas.width = canvasArea.width;
      imgCanvas.height = canvasArea.width * ratio;
      window.plugins.toast.showShortCenter("Try Pinching to Zoom");
    }

  },
  getFloor: function () {
    var floors = this.facility === 'clinic' ? this.model.clinic_info.floors : this.model.hospital_info.floors;
    if (floors) {
      for (var i = 0; i < floors.length; i++) {
        if (floors[i].id === parseInt(this.floor_id)) {
          return floors[i];
        }
      }
    }

    return {};
  }

});