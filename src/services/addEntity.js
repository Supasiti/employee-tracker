const addRole = require('../queries/roleQuery').add;
const addDepartment = require('../queries/departmentQuery').add;
const addEmployee = require('../queries/employeeQuery').add;


const queries = {
  role: addRole,
  department: addDepartment,
  employee: addEmployee
}

const add = (entity, newEntity) => {
  if (entity in queries) {
    return queries[entity](newEntity).catch(err => console.error(err));
  }
  console.error(`Entity ${entity} does not exist in this database`);
}

module.exports = add;