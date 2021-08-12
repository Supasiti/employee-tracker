const query = require('./baseQuery');
const { filterObjectByKeys, camelToUnderscore } = require('../services/utils')
const queryBuilder = require('./employeeQueryStringBuilder');

// ---------------------------------------------------------------------------------------
//  read

const findAll = (options) => {
  const {queryString, queryValues} = queryBuilder.create(options);
  return query(queryString, queryValues)
}

// find all return all employees' names in the db
const findAllNames = () => {
  return query(`
      SELECT 
        a.id,  
        CONCAT(a.first_name, ' ', a.last_name) AS name 
      FROM employee a`)
};

// find all return all managers'names in the db
const findAllManagers = () => {
  return query(`
SELECT 
  a.id,  
  CONCAT(a.first_name, ' ', a.last_name) AS name 
FROM employee a  
WHERE a.id in 
  (
    SELECT b.manager_id  
    FROM employee b
  )
      `)
}

// ---------------------------------------------------------------------------------------
// create / update

const add = (employee) => {
  const { firstName, lastName, roleId, managerId } = employee;
  return query(`
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)`, [firstName, lastName, roleId, managerId])
};

// create a query string for sql update
const createUpdateString = (obj) => {
  const keys = [...Object.keys(obj)];
  return keys.map((key) => `${camelToUnderscore(key)} = ?`).join(', ');
} 

// update employee role
const update = (id, newData) => {
  const allowed = ['firstName', 'lastName', 'roleId', 'managerId']
  const toUpdate = filterObjectByKeys(newData, allowed);
  
  return query(`
      UPDATE employee 
        SET ${createUpdateString(toUpdate)}
        WHERE id = ?`, [...Object.values(toUpdate), id])
};


module.exports = {
  findAll,
  findAllNames,
  findAllManagers,
  add,
  update
}