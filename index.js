require('dotenv').config();
require('./src/configs/mysqlConnection');
const cTable = require('console.table');


const findAll = require('./src/services/findAllDepartments');


findAll('employees').then(console.table);