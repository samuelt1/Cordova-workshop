var db;

window.SQLiteAdapter = {
  db: null,
  //the key associated with an image
  getImage: function (key, successCallBack, failureCallBack) {
    var query = "SELECT * from images WHERE key = ?";
    this.db.executeSql(query, [key],
            function (resultSet) {
              if (resultSet.rows.length > 0) {
                successCallBack(resultSet.rows.item(0));
              } else {
                failureCallBack("no Rows Returned");
              }
            },
            function (error) {
              console.log('SELECT error: ' + error.message);
            });
  },
  //the key associated with an image
  getAllImages: function (key, successCallBack, failureCallBack) {
    var query = "SELECT * from images WHERE key like ?";
    this.db.executeSql(query, ["%" + key + "%"],
            function (resultSet) {
              var images = [];
              for (var x = 0; x < resultSet.rows.length; x++) {
                images.push(resultSet.rows.item(x));
              }
              successCallBack(images);
            },
            function (error) {
              console.log('SELECT error: ' + error.message);
            });
  },
  // data:
  // has inside the key associated with the image
  // and it has the base64 data string
  // and the check sum
  addImage: function (data, callback) {
    var query = "INSERT INTO images (id, key, data, check_sum, type) VALUES (?,?,?,?,?)";

    this.db.executeSql(query, [data.id, data.key, data.base64, data.check_sum, data.type],
            function (res) {
              console.log("image " + data.key + " added");
            },
            function (error) {
              console.log('INSERT error: ' + error.message);
            });
  },
  //the key associated with an image
  removeImage: function (key) {

    var query = "DELETE FROM images WHERE key = ?";

    this.db.executeSql(query, [key],
            function (res) {
              console.log("rows removed: " + res.rowsAffected);
            },
            function (error) {
              console.log('DELETE error: ' + error.message);
            });

  },
  truncateImages: function () {

    var query = "DELETE FROM images";

    this.db.executeSql(query, [],
            function (res) {
              console.log("rows removed: " + res.rowsAffected);
            },
            function (error) {
              console.log('DELETE error: ' + error.message);
            });

  },
}
