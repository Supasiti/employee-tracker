const inquirer = require('inquirer');
const add = require('../services/addEntity');
const findAllNames = require('../services/findAllNames'); 

let currentRoles = [];
let currentEmployees = [];

const saveRoles = (newRoles) => {
  currentRoles = [...newRoles];
  return currentRoles;
}

const saveEmployees = (newEmployees) => {
  currentEmployees = [...newEmployees];
  return currentEmployees;
}

const getRoleIdByName = (title) => {
  const { id } = currentRoles.find((role) => role.title === title);
  return id;
}

const getManagerIdByName = (name) => { 
  const { id } = currentEmployees.find((em) => em.name === name);
  return id;
}

const createQuestions = () => [
  {
    type: 'input',
    name: 'firstName',
    message: 'What is the employee\'s first name?'
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'What is the employee\'s last name?'
  },
  {
    type: 'list',
    name: 'roleTitle',
    message: 'What is the employee\'s role?',
    choices: currentRoles.map((role) => role.title)
  },
  {
    type: 'list',
    name: 'managerName',
    message: 'What is the employee\'s manager?',
    choices: currentEmployees.map((em) => em.name)
  },
]

// handle answer
const handleAnswer = (answer) => {
  const roleId = getRoleIdByName(answer.roleTitle);
  const managerId = getManagerIdByName(answer.managerName);
  const newEmployee = {...answer, roleId, managerId};

  return add('employee', newEmployee)
    .then(() => {
      console.log(`${answer.firstName} ${answer.lastName} is added to the database`)
    })
    .catch(console.error)
};

// to start mini series of questions
const start = () => {

  return Promise.all([findAllNames('roles'), findAllNames('employees')])
    .then(([roles, employees]) => {
      saveRoles(roles); 
      saveEmployees(employees);
      console.log(currentEmployees);
      console.log(createQuestions());
    })
    .then(() => inquirer.prompt(createQuestions())) 
    .then(handleAnswer)
    .catch(console.error)
};

module.exports = {
  start
}