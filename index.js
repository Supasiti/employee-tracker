require('dotenv').config();
require('./src/configs/mysqlConnection');
const cTable = require('console.table');

const prompt = require('./src/frontend/userPrompt');

prompt.start();

// const findAllTest = require('./src/queries/employeeQuery').findAllTest;
// const getFilterString = require('./src/queries/employeeQuery').getFilterString;
// const { parseTextRow } = require('./src/services/utils');

// findAllTest({
//   where: {
//     departmentId: 2
//   }
// })
//   .then( ([results]) =>  results.map((textRow) => parseTextRow(textRow)))
//   .then(console.table)

// // const result = getFilterString({
//   // where: {
//   //   roleId: 1,
//   //   managerId: 'not null',
//   //   departmentId: 'null'
//   // }
// // },
// // ['roleId', 'managerId', 'departmentId']
// // )

// // console.log(result);