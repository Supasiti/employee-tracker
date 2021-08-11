require('dotenv').config();
require('./src/configs/mysqlConnection');
const cTable = require('console.table');


const findAll = require('./src/services/findAll');
const findAllNames = require('./src/services/findAllNames');
const add = require('./src/services/addEntity');
const addEmployee = require('./src/queries/employeeQuery').add;
const updateEntity = require('./src/services/updateEntity')


findAll('employees')
  .then(console.table)
  .then(() => updateEntity('employee', 'role', 12, 6))
  .then(() => findAll('employees'))
  .then(console.table)
  .catch(console.error);

// findAll('role').then(console.table);
// findAll('departments').then(console.table);

// findAllNames('employees')
//   .then(console.table)
//   .then(() => add('employee',
//     {
//       firstName: 'Thara',
//       lastName: 'Supasiti',
//       roleId:  4,
//       managerId: 2
//     }
//     ))
//   .then(() => findAllNames('employees'))
//   .then(console.table)
//   .catch(console.error);

// findAllNames('roles').then(console.table);
// findAllNames('departments').then(console.table);

