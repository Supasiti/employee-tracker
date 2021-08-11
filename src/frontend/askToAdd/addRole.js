const inquirer = require('inquirer');
const add = require('../../services/addEntity');
const findAllNames = require('../../services/findAllNames'); 

const getDepartmentIdByName = (name, data) => {
  const { id } = data.currentDepartments.find((dep) => dep.name === name);
  return id;
}

const createQuestions = (data) => [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of the role?'
  },
  {
    type: 'number',
    name: 'salary',
    message: 'What is the salary of the role?'
  },
  {
    type: 'list',
    name: 'departmentName',
    message: 'Which department does the role belong to?',
    choices: data.currentDepartments.map((dep) => dep.name)
  },
]

// handle answer
const handleAnswer = (answer, data) => {
  const departmentId = getDepartmentIdByName(answer.departmentName, data);
  const newRole = {...answer, departmentId};

  return add('role', newRole)
    .then(() => {
      console.log('A role is added to the database')
    })
    .catch(console.error)
};

// to start mini series of questions
const start = () => {
  const data = {};

  return findAllNames('departments')
    .then((dep) => {
      data.currentDepartments = dep;
    })
    .then(() => inquirer.prompt(createQuestions(data))) 
    .then((answer) => handleAnswer(answer, data))
    .catch(console.error)
};

module.exports = {
  start
}