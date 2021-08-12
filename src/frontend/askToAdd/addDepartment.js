const inquirer = require('inquirer');
const add = require('../../services/addEntity');

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is the name of the department?'
  }
]

// handle answer
const handleAnswer = (answer) => {
  return add('department', answer)
    .then(() => {
      console.log('A department is added to the database')
    })
    .catch(console.error)
};

// to start mini series of questions
const start = () =>{
  return inquirer
    .prompt(questions)
    .then(handleAnswer)
};

module.exports = {
  start
}