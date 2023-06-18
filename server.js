const express = require("express");
const queries = require("./queires.js");
const inquirer = require("inquirer");
const mainPrompt = require("./choices.js");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mainPrompt.promptChoicesAction();
