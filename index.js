require('dotenv').config();
require('./src/configs/mysqlConnection');
const cTable = require('console.table');

const prompt = require('./src/frontend/userPrompt');
const fgCyan = '\x1b[36m';
const fgReset = '\033[0m';
console.log(`${fgCyan} Welcome to Employee Tracker ${fgReset} \n`)

prompt.start();
