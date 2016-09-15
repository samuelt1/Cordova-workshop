window.ApplicationHelper = {
  initialize: function () {},
  isAndroid: function () {
    return /Android/i.test(navigator.userAgent);
  },
  isiOS: function () {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  },
  isNative: function () {
    return (window.document.URL.indexOf('http://') === -1 && window.document.URL.indexOf('https://') === -1);
  },
  /**
   * Checks if object is empty
   *
   * @param {Object} obj - Object to check
   *
   * @return {Bool} - Flag for empty object
   *
   */
  isEmpty: function (obj) {
    var key;

    // null and undefined are "empty"
    if (obj == null)
      return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)
      return false;
    if (obj.length === 0)
      return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  },
  /**
   * Returns the length between two points using the Pythagorean Theorem
   *
   * @param {Float} a - Value of first position
   * @param {Float} b - Value of second position
   *
   * @return {Float} - Value of distance between the two points
   *
   */
  getPythagorean: function (a, b) {

    // Calculates and returns Pythagorean of a and b
    return Math.sqrt((a * a) + (b * b));
  },
  /**
   * Returns a randomly generated number string.
   *
   * @param {Int} length - Length of random number string
   *
   * @return {String} - Random number string 
   * 
   */
  getRandomNumberString: function (length) {
    var numbers = '0123456789', // number characters
            charactors0to9, // character array of numbers 0-9
            charactors1to9, // character array of numbers 1-9
            randomId = '', // generated notification ID
            i;											// counter

    // Creates character array with numbers 0-9
    charactors0to9 = numbers.split('');

    // Creates chracter array with numbers 1-9
    charactors1to9 = numbers.split('');
    charactors1to9.splice(0, 1);

    // Builds notification ID using random number bits
    for (i = 0; i < length; i++) {

      // Creates a non-zero number character for the first bit
      if (i === 0) {
        randomId += charactors1to9[~~(Math.random() * charactors1to9.length)];
      } else {
        randomId += charactors0to9[~~(Math.random() * charactors0to9.length)];
      }
    }

    return randomId;
  },
  capitalizeFirstLetter: function (str) {
    var capitalized;

    if (str) {
      capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    }

    return capitalized;
  },
  isValidDate: function (date_to_check) {
    if (Object.prototype.toString.call(date_to_check) !== "[object Date]")
      return false;
    return !isNaN(date_to_check.getTime());
  },
  getDateString: function (date_to_string) {
    var str;

    str = (date_to_string.getMonth() + 1) + '/' + date_to_string.getDate() + '/' + date_to_string.getFullYear();

    return str;
  },
  getNativeTimeString: function (time_of_date) {
    var str,
            hours,
            minutes,
            hrs,
            mins,
            ampm;

    hours = time_of_date.getHours();
    minutes = time_of_date.getMinutes();

    hrs = (hours < 10) ? ('0' + hours) : hours;
    mins = (minutes < 10) ? ('0' + minutes) : minutes;

    str = hrs + ':' + mins + ':00';
    return str;
  },
  getTimeString: function (time_of_date) {
    var str,
            hours,
            minutes,
            hrs,
            mins,
            ampm;

    hours = time_of_date.getHours();
    minutes = time_of_date.getMinutes();

    ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;

    hrs = (hours < 10) ? ('0' + hours) : hours;
    mins = (minutes < 10) ? ('0' + minutes) : minutes;

    str = hrs + ':' + mins + ':00' + ' ' + ampm;
    return str;
  },
  getTimeStringByValue: function (time) {
    var str,
            hours,
            minutes,
            hrs,
            mins,
            ampm;

    hours = Math.floor(time);
    minutes = (time - hours) * 60;

    ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;

    hrs = (hours < 10) ? ('0' + hours) : hours;
    mins = (minutes < 10) ? ('0' + minutes) : minutes;

    str = hrs + ':' + mins + ':00' + ' ' + ampm;
    return str;
  }

};