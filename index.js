require('dotenv').config();
require('./src/configs/mysqlConnection');
const cTable = require('console.table');


const findAll = require('./src/services/findAll');


findAll('roles').then(console.log);
findAll('departments').then(console.log);
findAll('employees').then(console.log);