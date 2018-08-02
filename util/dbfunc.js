const mysql = require('mysql');
const  config = require('./database_config');

module.exports.getAll = function(callback){
  const connection = mysql.createConnection(config);

  connection.connect();

  const sql = "select * from all_things order by things.all_things.things_id desc";
  connection.query(sql, function (err, result) {
    if (err)
      throw err;
    callback(result);
  });
};

module.exports.add = function (addData, callback) {
  const connection = mysql.createConnection(config);

  connection.connect();

  const sql = "insert into things.all_things values('"
      + addData.title + "','" + addData.content +"','"
      + addData.status + "'," + 0 + ");";
  connection.query(sql, function (err, result) {
    if (err)
      throw err;
    callback(result);
  });
};

module.exports.delById = function (id, callback) {
  const connection = mysql.createConnection(config);

  connection.connect();

  const sql = "delete from things.all_things where things_id = " + id + ";";
  connection.query(sql, function (err, result) {
    if (err)
      throw err;
    callback(result);
  });
};

module.exports.updateById = function (messageJSON, id, callback) {
  const connection = mysql.createConnection(config);

  connection.connect();

  const sql = "update things.all_things set title='"
      + messageJSON.title + "', content='" + messageJSON.content
      + "', status='" + messageJSON.status + "' "
      + " where things_id = " + id + ";";
  connection.query(sql, function (err, result) {
    if (err)
      throw err;
    callback(result);
  });
};
