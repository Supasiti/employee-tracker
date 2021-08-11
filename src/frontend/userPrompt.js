// main access to CLI 
const inquirer = require('inquirer');
const askToView = require('./askToView');
const askToAdd = require('./askToAdd');
const askToUpdateEmployeeRole = require('./askToUpdateEmployeeRole');

const questions = [
  {
    type: 'list',
    name: 'purpose',
    message: 'What would you like to do?',
    choices: [
      'View All',
      'Add',
      'Update Employee\'s Role',
      'Quit'
    ]
  }
]

// handle when user answer
const handleAnswer = (answer) => {
  const { purpose } = answer;

  if (purpose === 'View All') return askToView.start().then(() => start());
  if (purpose === 'Add') return askToAdd.start().then(() => start());
  if (purpose === 'Update Employee\'s Role')  return askToUpdateEmployeeRole.start().then(() => start())
  if (purpose === 'Quit') return process.exit();
};

//  to start the CLI
const start = () => {
  return inquirer
    .prompt(questions)
    .then(handleAnswer)
};

module.exports = {
  start
}