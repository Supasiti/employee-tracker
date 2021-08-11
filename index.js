require('dotenv').config();
require('./src/configs/mysqlConnection');
const cTable = require('console.table');

const prompt = require('./src/frontend/userPrompt');

prompt.start();
