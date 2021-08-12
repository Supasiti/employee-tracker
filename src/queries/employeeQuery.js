const sql = require('../configs/mysqlConnection');
const { filterObjectByKeys, camelToUnderscore } = require('../services/utils')

// ---------------------------------------------------------------------------------------
//  generating query string

const rawEmployeeWithManagerQueryString = `
  SELECT 
    a.*,
    CONCAT(b.first_name, ' ', b.last_name) AS manager
  FROM employee a
  LEFT JOIN employee b 
    ON a.manager_id = b.id`;

const rawQueryString = `
  SELECT 
    a.*,
    r.title,
    r.salary,
    r.department_id,
    d.name AS department_name
  FROM  (${rawEmployeeWithManagerQueryString}) AS a
  LEFT JOIN role r ON a.role_id = r.id
  LEFT JOIN department d ON r.department_id=d.id` ;

const findAllQueryString = (from) => `
  SELECT 
    a.id,
    a.first_name, 
    a.last_name, 
    a.title,
    a.department_name,
    a.salary,
    a.manager
  FROM  (${from}) AS a`
  
//  filterObj can be 
//    { attr: 'not null'}
//    { attr: 'null'}
//    { attr: num}
const getSingleFilterString = ([key, value]) => {
  const underscoredKey = camelToUnderscore(key);
  if (value === 'not null') return `${underscoredKey} IS NOT NULL`;
  if (value === 'null') return `${underscoredKey} IS NULL`;
  return `a.${underscoredKey} = ?`;
};

const getFilterString = (filterObj) => {
  const entries = [...Object.entries(filterObj)];
  const attrString = entries.map((entry) => getSingleFilterString(entry)).join(', ');
  return `WHERE ${attrString}`;
};

const getFilterValues = (filterObj) => {
  const nonValues = ['null', 'not null'];
  const values = Object.values(filterObj)
  return values.filter((value) => !nonValues.includes(value));
};

// ---------------------------------------------------------------------------------------
//  Get all employees + filter

// default return -- without any filter
const findAllDefault = () => {
  return sql.promise()
    .query(findAllQueryString(rawQueryString))
    .catch(console.error);
}

// find all return all employees in the db
// with their role titles, salaries, departments and managers
// with option to put in filter
const findAll = (options) => {
  if (!options) return findAllDefault();
  
  const { where } = options;
  if (!where) return findAllDefault();

  const allowed = ['roleId', 'managerId', 'departmentId'];
  const filter = filterObjectByKeys(where, allowed);

  return sql.promise()
    .query(
      findAllQueryString(`
        SELECT * FROM ( ${rawQueryString} ) AS a
        ${getFilterString(filter)}`
      ) 
    , getFilterValues(filter))
    .catch(console.error);
}

// find all return all employees' names in the db
const findAllNames = () => {
  return sql.promise()
    .query(`
      SELECT 
        a.id,  
        CONCAT(a.first_name, ' ', a.last_name) AS name 
      FROM employee a`)
    .catch(console.error)
};

// find all return all managers'names in the db
const findAllManagers = () => {
  return sql.promise()
    .query(`
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
    .catch(console.error)
}



// ---------------------------------------------------------------------------------------
// add an employee  to the db
const add = (employee) => {
  const { firstName, lastName, roleId, managerId } = employee;
  return sql.promise()
    .query(`
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)`, [firstName, lastName, roleId, managerId])
    .catch(console.error)
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
  
  return sql.promise()
    .query(`
      UPDATE employee 
        SET ${createUpdateString(toUpdate)}
        WHERE id = ?`, [...Object.values(toUpdate), id])
    .catch(console.error)
};


module.exports = {
  findAll,
  findAllNames,
  findAllManagers,
  add,
  update
}