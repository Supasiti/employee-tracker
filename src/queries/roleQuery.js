const sql = require('../configs/mysqlConnection');

// find all return all roles in the db
const findAll = () => {
  return sql.promise()
    .query('SELECT * FROM `role`')
    .catch(console.error)
}

// add a role name to the db
const add = ({title, salary, departmentId}) => {
  return sql.promise()
    .query(`
      INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?)`, [title, salary, departmentId])
    .catch(console.error)
}
  

module.exports = {
  findAll,
  add
}