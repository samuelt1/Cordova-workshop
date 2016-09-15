window.SpinAdapter = {
  initialize: function () {
    if (this.isSupported() === true) {
      this.load();
    } else {
      console.log('Spinner is not supported.');
    }
  },
  isSupported: function () {
    return false;
  },
  load: function () {
    var options,
            target,
            spinner;

    options = {
      lines: 7 // The number of lines to draw
      , length: 12 // The length of each line
      , width: 27 // The line thickness
      , radius: 42 // The radius of the inner circle
      , scale: 0.5 // Scales overall size of the spinner
      , corners: 1 // Corner roundness (0..1)
      , color: '#000' // #rgb or #rrggbb or array of colors
      , opacity: 0.6 // Opacity of the lines
      , rotate: 0 // The rotation offset
      , direction: 1 // 1: clockwise, -1: counterclockwise
      , speed: 1 // Rounds per second
      , trail: 60 // Afterglow percentage
      , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
      , zIndex: 2e9 // The z-index (defaults to 2000000000)
      , className: 'spinner' // The CSS class to assign to the spinner
      , top: '50%' // Top position relative to parent
      , left: '50%' // Left position relative to parent
      , shadow: false // Whether to render a shadow
      , hwaccel: false // Whether to use hardware acceleration
      , position: 'absolute' // Element positioning
    };

    target = document.getElementById('spinner');
    spinner = new Spinner(options);

    this.spinner = spinner;
    this.target = target;
    this.is_active = false;
    document.getElementById('spinner-background').style.display = 'none';
  },
  show: function (callback) {
    if (this.isSupported() === true) {
      document.getElementById('spinner-background').style.display = 'block';
      this.spinner.spin(this.target);
      this.is_active = true;

      if (typeof (callback) !== 'undefined') {
        callback();
      }
    }
  },
  hide: function (callback) {
    if (this.isSupported() === true) {
      document.getElementById('spinner-background').style.display = 'none';
      this.spinner.stop();
      this.is_active = false;

      if (typeof (callback) !== 'undefined') {
        callback();
      }
    }
  },
  is_spinner_active: function () {
    return this.is_active;
  }

};