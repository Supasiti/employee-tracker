// main access to CLI 
const inquirer = require('inquirer');
const displayAll = require('./displayAll');


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




const handleAnswer = (answer) => {
  const { purpose } = answer;

  if (purpose === 'View All Employees')   return displayAll('employees').then(() => start());
  if (purpose === 'View All Roles')       return displayAll('roles').then(() => start());
  if (purpose === 'View All Departments') return displayAll('departments').then(() => start());

  if (purpose === 'Quit') return process.exit();
}



const start = () =>{
  return inquirer
    .prompt(questions)
    .then(handleAnswer)
}

module.exports = {
  start
}