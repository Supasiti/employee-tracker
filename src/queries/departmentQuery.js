const sql = require('../configs/mysqlConnection');

// find all return all departments in the db
const findAll = () => {
  return sql.promise()
    .query('SELECT * FROM `department`')
    .catch(console.error)
}

// add a department name to the db
const add = (name) => {
  return sql.promise()
    .query(`
      INSERT INTO department (name)
      VALUES (?)`, name)
    .catch(console.error)
}
  

module.exports = {
  findAll,
  add
}