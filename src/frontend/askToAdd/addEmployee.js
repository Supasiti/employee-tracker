const inquirer = require('inquirer');
const add = require('../../services/addEntity');
const findAllNames = require('../../services/findAllNames'); 

const getRoleIdByName = (title, data) => {
  const { id } = data.currentRoles.find((role) => role.title === title);
  return id;
}

const getManagerIdByName = (name, data) => { 
  if (name === 'None') return null;
  const { id } = data.currentEmployees.find((em) => em.name === name);
  return id;
}

const createQuestions = (data) => [
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
    choices: data.currentRoles.map((role) => role.title)
  },
  {
    type: 'list',
    name: 'managerName',
    message: 'What is the employee\'s manager?',
    choices: ['None', ...data.currentEmployees.map((em) => em.name)]
  },
];


// handle answer
const handleAnswer = (answer, data) => {
  const roleId = getRoleIdByName(answer.roleTitle, data);
  const managerId = getManagerIdByName(answer.managerName, data);
  const newEmployee = {...answer, roleId, managerId};

  return add('employee', newEmployee)
    .then(() => {
      console.log(`${answer.firstName} ${answer.lastName} is added to the database`)
    })
    .catch(console.error)
};

// to start mini series of questions
const start = () => {
  const data = {};

  return Promise.all([findAllNames('roles'), findAllNames('employees')])
    .then(([roles, employees]) => {
      data.currentRoles = [...roles]; 
      data.currentEmployees = [...employees];
    })
    .then(() => inquirer.prompt(createQuestions(data))) 
    .then((answer) => handleAnswer(answer, data))
    .catch(console.error)
};

module.exports = {
  start
}