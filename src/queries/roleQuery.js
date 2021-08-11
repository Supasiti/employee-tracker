const sql = require('../configs/mysqlConnection');

// find all return all roles in the db - join with info from department
const findAll = () => {
  return sql.promise()
    .query(`
      SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        LEFT JOIN department ON role.department_id=department.id 
    `)
    .catch(console.error)
}


// find all return all role titles in the db
const findAllTitles = () => {
  return sql.promise()
    .query(`SELECT role.id, role.title FROM role`)
    .catch(console.error)
}


// add a role name to the db
const add = (role) => {
  const {title, salary, departmentId } = role;
  return sql.promise()
    .query(`
      INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?)`, [title, salary, departmentId])
    .catch(console.error)
}
  

module.exports = {
  findAll,
  findAllTitles,
  add
}