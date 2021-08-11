const findAllRoles = require('../queries/roleQuery').findAllTitles;
const findAllDeparments = require('../queries/departmentQuery').findAll;
const findAllEmployees = require('../queries/employeeQuery').findAllNames;
const { parseTextRow } = require('./utils');

const queries = {
  roles: findAllRoles,
  departments: findAllDeparments,
  employees: findAllEmployees
}

const findAllNames = (entity) => {
  if (entity in queries) {
    return queries[entity]()
      .then( ([results]) =>  results.map((textRow) => parseTextRow(textRow)));
  }
  throw new Error(`Entity (${entity}) does not exist in this database`);
}

module.exports = findAllNames;