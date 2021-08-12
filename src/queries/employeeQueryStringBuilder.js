const { filterObjectByKeys, camelToUnderscore } = require('../services/utils')

const rawEmployeeWithManagerString = `
SELECT 
  a.*,
  CONCAT(b.first_name, ' ', b.last_name) AS manager
FROM employee a
LEFT JOIN employee b 
  ON a.manager_id = b.id`;

const rawString = `
SELECT 
  a.*,
  r.title,
  r.salary,
  r.department_id,
  d.name AS department_name
FROM  (${rawEmployeeWithManagerString}) AS a
LEFT JOIN role r ON a.role_id = r.id
LEFT JOIN department d ON r.department_id=d.id` ;

const getFinalString = (from) => `
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

// create a filter string, it would look like :
//   ' WHERE value = ?, value IS NOT NULL...
const getFilterString = (filterObj) => {
const entries = [...Object.entries(filterObj)];
const attrString = entries.map((entry) => getSingleFilterString(entry)).join(', ');
return `WHERE ${attrString}`;
};

// create a filter values to prepare statement (filtered out by non-values) :
const getFilterValues = (filterObj) => {
const nonValues = ['null', 'not null'];
const values = Object.values(filterObj)
return values.filter((value) => !nonValues.includes(value));
};

// default setting
const defaultString = getFinalString(rawString);
const defaultQuery = {
  queryString: defaultString, 
  queryValues:[]
}

//  composition
const create = (options) => {
  if (!options) return defaultQuery;
  
  const { where } = options;
  if (!where) return defaultQuery;

  const allowed = ['roleId', 'managerId', 'departmentId'];
  const filter = filterObjectByKeys(where, allowed);
  const queryString = getFinalString(`
    SELECT * FROM ( ${rawString} ) AS a
    ${getFilterString(filter)}`
  ) 
  const queryValues = getFilterValues(filter);

  return {queryString, queryValues}
}


module.exports = { 
  create
}