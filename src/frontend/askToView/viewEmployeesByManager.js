const inquirer = require('inquirer');
const findAll = require('../../services/findAll');

const createQuestions = (data) => {
  const managers = data.employees.map((em) => em.manager);
  const choices = managers.reduce((acc, cur) => {
    if (cur && !acc.includes(cur)) return [...acc, cur];
    return [...acc];
  }, [])

  return [
    {
      type: 'list',
      name: 'managerName',
      message: 'Which manager would you to view?',
      choices
    }
  ];
}

// handle answer
const handleAnswer = (answer, data) => {
  const toDisplay = data.employees.filter((employee) => employee.manager === answer.managerName);
  console.log('');
  console.table(toDisplay);
};

// to start mini series of questions
const start = () => {
  const data = {};

  return findAll('employees')
    .then((result) => {
      data.employees = [...result];
    })
    .then(() => inquirer.prompt(createQuestions(data))) 
    .then((answer) => handleAnswer(answer, data))
    .catch(console.error)
};

module.exports = {
  start
}