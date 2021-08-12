const query = require('./baseQuery');

// find all return all departments in the db
const findAll = () => {
  return query('SELECT * FROM `department`')
}

// add a department name to the db
const add = (department) => {
  const { name } = department;
  return query(`
      INSERT INTO department (name)
      VALUES (?)`, name)
}
  
module.exports = {
  findAll,
  add
}