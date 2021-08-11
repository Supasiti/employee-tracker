const inquirer = require('inquirer');
const displayAll = require('./displayAll');
const viewEmployees = require('./askToView/viewEmployees');

const questions = [
  {
    type: 'list',
    name: 'toView',
    message: 'What would you like to view?',
    choices: ['Department', 'Role', 'Employee']
  }
];


// handle answer
const handleAnswer = (answer) => {
  const { toView } = answer;
  if (toView === 'Department') return displayAll('departments');
  if (toView === 'Role')       return displayAll('roles');
  if (toView === 'Employee')   return viewEmployees.start();
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