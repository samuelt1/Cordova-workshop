window.CameraAdapter = {
  initialize: function () {},
  /**
   * Checks if Local Notifications are supported.
   * 
   * @return {Bool} - Boolean for local notifications support
   * 
   */
  isSupported: function () {
    var isAvailable;

    isAvailable = typeof (navigator.camera) !== 'undefined';
    if (isAvailable === false) {
      console.log('Camera not supported.');
    }
    return isAvailable;
  },
  getPicture: function (success, error) {
    if (this.isSupported() === true) {
      navigator.camera.getPicture(function (imageData) {
        if (success) {
          success(imageData);
        }
      }, function (errorMessage) {
        console.log('Camera.getPicture encountered an error: ' + errorMessage);
        if (error) {
          error(errorMessage);
        }
      }, {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 512,
        targetHeight: 512
      });
    }
  }

};