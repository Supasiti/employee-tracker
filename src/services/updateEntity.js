const updateEmployee = require('../queries/employeeQuery').update;

const queries = {
  employee: updateEmployee
};


const updateEntity = (entity, id, newAttrValue) =>{
  if (entity in queries) {
    return queries[entity](id, newAttrValue).catch(console.error);
  }
  throw new Error(`This (${entity}) does not exist in database`)
}

module.exports = updateEntity;