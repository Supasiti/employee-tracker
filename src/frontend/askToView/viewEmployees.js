const inquirer = require('inquirer');
const displayAll = require('../displayAll');
const viewEmployeesByManager = require('./viewEmployeesByManager');
const viewEmployeesByDepartment = require('./viewEmployeesByDepartment');

const questions = [
  {
    type: 'list',
    name: 'filteredBy',
    message: 'What filter would you like to use?',
    choices: ['None', 'Manager', 'Department']
  }
];


// handle answer
const handleAnswer = (answer) => {
  const { filteredBy } = answer;
  if (filteredBy === 'None')       return displayAll('employees');
  if (filteredBy === 'Manager')    return viewEmployeesByManager.start()
  if (filteredBy === 'Department') return viewEmployeesByDepartment.start()
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