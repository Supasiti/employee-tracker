const sql = require('../configs/mysqlConnection');

// find all return all employees in the db
const findAll = () => {
  return sql.promise()
    .query('SELECT * FROM `employee`')
    .catch(console.error)
}

// add an employee  to the db
const add = ({firstName, lastName, roleId, managerId}) => {
  return sql.promise()
    .query(`
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)`, [firstName, lastName, roleId, managerId])
    .catch(console.error)
}
  
const updateRole = (id, newRoleId) => {
  return sql.promise()
    .query(`
      UPDATE employee 
        SET role_id = ?
        WHERE id = ?`, [newRoleId, id])
    .catch(console.error)
}

module.exports = {
  findAll,
  add,
  updateRole
}