const query = require('./baseQuery');

// find all return all roles in the db - join with info from department
const findAll = () => query(`
SELECT role.id, role.title, role.salary, department.name AS department
  FROM role
  LEFT JOIN department ON role.department_id=department.id `);

// find all return all role titles in the db
const findAllTitles = () => query(`SELECT role.id, role.title FROM role`);


// add a role name to the db
const add = (role) => {
  const {title, salary, departmentId } = role;
  return query(`
INSERT INTO role (title, salary, department_id)
VALUES (?, ?, ?)`, [title, salary, departmentId])
}
  
module.exports = {
  findAll,
  findAllTitles,
  add
}