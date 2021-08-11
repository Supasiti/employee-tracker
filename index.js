require('dotenv').config();

const connection = require('./src/configs/mysqlConnection');

connection.query(
  'SELECT * FROM `department`',
  (err, results) =>  {console.log(results);}
)