const inquirer = require('inquirer');
const findAll = require('../../services/findAll');
const findAllNames = require('../../services/findAllNames');

const createQuestions = (data) => {
  return [
    {
      type: 'list',
      name: 'deptName',
      message: 'Which department would you to view?',
      choices: [...data.depts]
    }
  ];
}

// get manager id from the list
const getDepartmentIdByName = (name, data) => {
  const { id } = data.depts.find((dept) => dept.name === name);
  return id;
}

// handle answer
const handleAnswer = (answer, data) => {
  const filterValue = getDepartmentIdByName(answer.deptName, data);
  const filterObj = {
    where : {
      departmentId : filterValue
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

  return findAllNames('departments')
    .then((result) => {
      data.depts = [...result];
    })
    .then(() => inquirer.prompt(createQuestions(data))) 
    .then((answer) => handleAnswer(answer, data))
    .catch(console.error)
};

module.exports = {
  start
}