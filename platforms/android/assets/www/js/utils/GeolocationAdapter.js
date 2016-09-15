window.GeolocationAdapter = {
  initialize: function () {},
  /**
   * Checks if Geolocation is supported.
   * 
   * @return {Bool} - Boolean for notifications support
   * 
   */
  isSupported: function () {
    var isAvailable;

    isAvailable = navigator && navigator.geolocation;

    if (isAvailable === false) {
      console.log('Geolocation is not supported.');
    }

    return isAvailable;
  },
  /**
   * Finds the nearest location to current position.
   * 
   * @param {Function} successCallback (Optional) - Callback for successful geolocation retrieval
   * @param {Function} errorCallback (Optional) - Callback for failed geolocation retrieval
   *
   * Example:
   *	
   * 	successCallback = function (position) {
   * 		console.log('Your are located at ' + position.latitude + ', ' + position.longitude);
   * 	};
   *	errorCallback = function (error) {
   * 		console.log('Error Code: ' + error.code + ' - ' + error.message);
   *	};
   *
   * 	GeocationAdapter.getCurrentLocation(successCallback, errorCallback);
   * 
   */
  getCurrentLocation: function (successCallback, errorCallback) {
    var options, // geolocation options
            success, // success callback
            fail;		// failure callback

    // Set Geolocation options with application defaults
    options = {
      enableHighAccuracy: Config.GEOLOCATION.OPTIONS.HIGH_ACCURACY,
      maximumAge: Config.GEOLOCATION.OPTIONS.MAX_AGE,
      timeout: Config.GEOLOCATION.OPTIONS.TIMEOUT
    };

    // Checks if Geolocation is supported
    if (this.isSupported()) {

      success = function (position) {
        console.log('Geolocation success: ' + JSON.stringify(position));
        if (successCallback) {
          successCallback({
            latitude: position.coords.latitude, // latitude
            longitude: position.coords.longitude, // longitude
            timeStamp: position.timeStamp			// timestamp of retrieval
          });
        }
      };

      fail = function (error) {
        console.log('Geolocation error: ' + JSON.stringify(error));
        if (errorCallback) {
          errorCallback({
            code: error.code, // error code
            message: this.getErrorMessage(error.code)	// error message
          });
        }
      };

      // Retrieve geolocation
      navigator.geolocation.getCurrentPosition(success, fail, options);

    }

  },
  /**
   * Returns the nearest location to a position using a provided list of locations.
   *
   * 
   * @param {Object} position - Coordinates used to find nearest location
   * @param {Array} locations - List of locations 
   * @param {String} defaultLocation (Optional) - Default location if there are multiple
   *	nearest locations found 
   *
   * @return {Object} - Location object
   *
   *
   *
   * Example:
   *	
   * 	position = { 
   *		latitude: 34.0665447, 
   *		longitude: -118.4474875 
   *	};
   *  
   *	locations = [
   *		{ name: 'Westwood', latitude: 34.0665447, longitude: -118.4474875 },
   *		{ name: 'Santa Monica', latitude: 34.025106, longitude: -118.490997 }
   *	];
   *
   * 	GeocationAdapter.getNearestLocation(position, locations, 'Westwood');
   *
   *	result: 'Westwood'
   * 
   */
  getNearestLocation: function (position, locations, defaultLocation) {
    var location0, // default location
            nearest, // nearest location
            distance, // location distance from position
            i;				// counter

    // Iterates through the list of locations to find the nearest location to 
    // the provided position
    for (i = 0; i < locations.length; i++) {
      // Calculates the distance from the location to the provided position
      distance = ApplicationHelper.getPythagorean(position.latitude - locations[i].latitude, position.longitude - locations[i].longitude);
      console.log(distance);

      // Sets the default location, if provided
      if (defaultLocation && defaultLocation.id === locations[i].id) {
        location0 = {key: i, value: distance};
      }

      // Sets the nearest location if the distance is less than the current nearest distance or has not been set
      if (nearest && nearest.value) {
        if (distance < nearest.value) {
          nearest = {key: i, value: distance};
        }
      } else {
        nearest = {key: i, value: distance};
      }
    }

    // Uses the default location if it is equal distance from the nearest location
    if (location0 && location0.value) {
      if (location0.value <= nearest.value) {
        nearest = {key: location0.key, value: location0.value};
      }
    }

    console.log('Nearest location is ' + locations[nearest.key].name);
    return locations[nearest.key];

  },
  /**
   * Returns an error message corresponding to the provided error code.
   *
   * @param {Int} code - Error Code
   *
   * @return {String} - Error Message
   *
   */
  getErrorMessage: function (code) {
    var message = '';

    switch (code) {
      case 1:
        message = 'Geolocation permission is denied.';
        break;
      case 2:
        message = 'Geolocation information is unavailable.';
        break;
      case 3:
        message = 'Geolocation request timed out.';
        break;
      case 4:
        message = 'Geolocation encountered an unknown error.';
        break;
    }

    return message;
  }

};