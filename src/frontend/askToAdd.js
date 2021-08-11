const inquirer = require('inquirer');
const AddDepartment = require('./askToAdd/addDepartment');
const AddRole = require('./askToAdd/addRole');
const AddEmployee = require('./askToAdd/addEmployee');

const questions = [
  {
    type: 'list',
    name: 'toAdd',
    message: 'What would you like to add?',
    choices: ['Department', 'Role', 'Employee']
  }
];


// handle answer
const handleAnswer = (answer) => {
  const { toAdd} = answer;
  if (toAdd === 'Department') return AddDepartment.start();
  if (toAdd === 'Role')       return AddRole.start();
  if (toAdd === 'Employee')   return AddEmployee.start();
};

// to start mini series of questions
const start = () => {
  return inquirer
    .prompt(questions)
    .then(handleAnswer)
    .catch(console.error)
};

module.exports = {
  start
}