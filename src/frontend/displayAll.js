const findAll = require('../services/findAll');


const displayAll = (entity) => {
  return findAll(entity)
    .then((array) => {
      console.log('');
      console.table(array)
    })
    .catch(console.error);
}

module.exports = displayAll;