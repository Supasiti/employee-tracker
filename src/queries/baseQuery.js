const sql = require('../configs/mysqlConnection');

const query = (string, values) => {
  return sql.promise()
    .query(string, values)
    .catch(console.error)
}

module.exports = query;