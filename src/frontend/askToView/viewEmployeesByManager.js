const inquirer = require('inquirer');
const findAll = require('../../services/findAll');
const findAllNames = require('../../services/findAllNames');

const createQuestions = (data) => {
  return [
    {
      type: 'list',
      name: 'managerName',
      message: 'Which manager would you to view?',
      choices: ['None', ...data.managers]
    }
  ];
}

// get manager id from the list
const getManagerIdByName = (name, data) => {
  if (name === 'None') return 'null';
  const { id } = data.managers.find((manager) => manager.name === name);
  return id;
}

// handle answer
const handleAnswer = (answer, data) => {
  const filterValue = getManagerIdByName(answer.managerName, data);
  const filterObj = {
    where : {
      managerId : filterValue
    }
  }
  return findAll('employees', filterObj)
    .then( (toDisplay) =>{
      console.log('');
      console.table(toDisplay);
    })
    .catch(console.error)
};

// to start mini series of questions
const start = () => {
  const data = {};

  return findAllNames('managers')
    .then((result) => {
      data.managers = [...result];
    })
    .then(() => inquirer.prompt(createQuestions(data))) 
    .then((answer) => handleAnswer(answer, data))
    .catch(console.error)
};

module.exports = {
  start
}