require('dotenv').config();
require('./src/configs/mysqlConnection');
const emQuery = require('./src/queries/employeeQuery');


emQuery.findAll()
  .then( ([rows]) => {
    console.log(rows)
  });


emQuery.add({
  firstName: "Bob",
  lastName: "YourUncle",
  roleId: 6,
  managerId: 3
})
.then( () => emQuery.findAll())
.then(([rows]) => {console.log(rows)})
.then( () => emQuery.updateRole(13, 5))
.then(() => emQuery.findAll())
.then(([rows]) => {console.log(rows)});

