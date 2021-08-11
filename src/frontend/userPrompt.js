// main access to CLI 
const inquirer = require('inquirer');
const displayAll = require('./displayAll');
const askForNewDepartment = require('./askForNewDepartment');
const askForNewRole = require('./askForNewRole');

const questions = [
  {
    type: 'list',
    name: 'purpose',
    message: 'What would you like to do?',
    choices: [
      'View All Employees',
      'View All Roles',
      'View All Departments',
      'Add Employee',
      'Add Role',
      'Add Department',
      'Update Employee\'s Role',
      'Quit'
    ]
  }
]

// handle when user answer
const handleAnswer = (answer) => {
  const { purpose } = answer;

  if (purpose === 'View All Employees')   return displayAll('employees').then(() => start());
  if (purpose === 'View All Roles')       return displayAll('roles').then(() => start());
  if (purpose === 'View All Departments') return displayAll('departments').then(() => start());

  if (purpose === 'Add Department') return askForNewDepartment.start().then(() => start())
  if (purpose === 'Add Role')       return askForNewRole.start().then(() => start())
  if (purpose === 'Quit') return process.exit();
};

//  to start the CLI
const start = () =>{
  return inquirer
    .prompt(questions)
    .then(handleAnswer)
};

module.exports = {
  start
}