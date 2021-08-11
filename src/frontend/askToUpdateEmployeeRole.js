const inquirer = require('inquirer');
const update = require('../services/updateEntity');
const findAllNames = require('../services/findAllNames'); 

let currentRoles = [];
let currentEmployees = [];

const getRoleIdByName = (title) => {
  const { id } = currentRoles.find((role) => role.title === title);
  return id;
}

const getEmployeeIdByName = (name) => { 
  const { id } = currentEmployees.find((em) => em.name === name);
  return id;
}

const createQuestions = () => [
  {
    type: 'list',
    name: 'employeeName',
    message: 'Which employee\'s role would you like to update?',
    choices: currentEmployees.map((em) => em.name)
  },
  {
    type: 'list',
    name: 'roleTitle',
    message: 'Which role would you like to assign them to?',
    choices: currentRoles.map((role) => role.title)
  }
]

// handle answer
const handleAnswer = (answer) => {
  const roleId = getRoleIdByName(answer.roleTitle);
  const employeeId = getEmployeeIdByName(answer.employeeName);

  return update('employee', employeeId, {roleId})
    .then(() => {
      console.log(`${answer.employeeName}'s role has updated to ${answer.roleTitle}`)
    })
    .catch(console.error)
};

// to start mini series of questions
const start = () => {

  return Promise.all([findAllNames('roles'), findAllNames('employees')])
    .then(([roles, employees]) => {
      currentRoles = [...roles]; 
      currentEmployees = [...employees];
    })
    .then(() => inquirer.prompt(createQuestions())) 
    .then(handleAnswer)
    .catch(console.error)
};

module.exports = {
  start
}