window.NetworkAdapter = {
  getConnection: function () {
    return navigator.connection.type;
  },
  isConnected: function () {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = false;
    states[Connection.ETHERNET] = true;
    states[Connection.WIFI] = true;
    states[Connection.CELL_2G] = true;
    states[Connection.CELL_3G] = true;
    states[Connection.CELL_4G] = true;
    states[Connection.CELL] = true;
    states[Connection.NONE] = false;
    if (states[networkState]) {
      return true;
    } else {
      return false;
    }
  }
};