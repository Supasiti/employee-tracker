const sql = require('../configs/mysqlConnection');

// find all return all employees in the db
// with their role titles, salaries, departments and managers
const findAll = () => {
  return sql.promise()
    .query(`
      SELECT 
        a.first_name, 
        a.last_name, 
        r.title,
        d.name AS department,
        r.salary,
        a.manager
      FROM 
        (
          SELECT 
            a.first_name,
            a.last_name,
            a.role_id,
            CONCAT(b.first_name, ' ', b.last_name) AS manager
          FROM employee a, employee b
          WHERE a.manager_id = b.id
        ) AS a
      LEFT JOIN role r ON a.role_id = r.id
      LEFT JOIN department d ON r.department_id=d.id;
    `)
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

// update employee role
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