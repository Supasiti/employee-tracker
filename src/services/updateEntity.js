const updateEmployeeRole = require('../queries/employeeQuery').updateRole;

const queries = {
  employee: {
    role: updateEmployeeRole
  }
};

const validateInput = (entity, attr) => {
  if (entity in queries && attr in queries[entity]) return true;
  throw new Error(`This (${entity}) or attribute (${attr}) does not exist in database`)
}

const updateEntity = (entity, attr, id, newAttrValue) =>{
  if (validateInput(entity, attr)) {
    return queries[entity][attr](id, newAttrValue).catch(console.error);
  }
}

module.exports = updateEntity;