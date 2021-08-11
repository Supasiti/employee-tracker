const inquirer = require('inquirer');
const add = require('../services/addEntity');
const findAllNames = require('../services/findAllNames'); 

let departments = [];

const saveDepartments = (newDep) => {
  departments = [...newDep];
  return departments;
}

const getDepartmentIdByName = (name) => {
  const { id } = departments.find((dep) => dep.name === name);
  return id;
}

const createQuestions = (departments) => [
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
    choices: departments.map((dep) => dep.name)
  },
]

// handle answer
const handleAnswer = (answer) => {
  const departmentId = getDepartmentIdByName(answer.departmentName);
  const newRole = {...answer, departmentId};

  return add('role', newRole)
    .then(() => {
      console.log('A role is added to the database')
    })
    .catch(console.error)
};

// to start mini series of questions
const start = () => {
  return findAllNames('departments')
    .then(saveDepartments)
    .then( (dep) => {
      return inquirer.prompt(createQuestions(dep))
    }) 
    .then(handleAnswer)
    .catch(console.error)
};

module.exports = {
  start
}