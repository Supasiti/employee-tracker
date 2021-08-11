const depQuery = require('../queries/departmentQuery');
const { parseTextRow } = require('./utils');

const viewDepartments = () => {
  return depQuery.findAll()
    .then( ([results]) =>  results.map((textRow) => parseTextRow(textRow)));
}




module.exports = viewDepartments;