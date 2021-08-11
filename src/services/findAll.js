const findAllRoles = require('../queries/roleQuery').findAll;
const findAllDeparments = require('../queries/departmentQuery').findAll;
const findAllEmployees = require('../queries/employeeQuery').findAll;
const { parseTextRow } = require('./utils');

const queries = {
  roles: findAllRoles,
  departments: findAllDeparments,
  employees: findAllEmployees
}

const findAll = (entity) => {
  if (entity in queries) {
    return queries[entity]()
      .then( ([results]) =>  results.map((textRow) => parseTextRow(textRow)));
  }
  throw new Error(`Entity (${entity}) does not exist in this database`);
}

module.exports = findAll;