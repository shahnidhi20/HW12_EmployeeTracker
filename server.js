const express = require("express");
const queries = require("/queires.js");
const inquirer = require("inquirer");
const mainPrompt = require("/choices.js");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function promptChoicesAction() {
  // prompt user actions using inquirer
  inquirer
    .prompt(mainPrompt)
    // await user responce from inquirer
    .then(function (answer) {
      // execute function viewAll if user selection is "View employees"
      if (answer.action == "View employees") {
        queries.viewAllEmployees();
        promptChoicesAction();

        // execute function viewDept if user selection is "View departments"
      } else if (answer.action == "View departments") {
        queries.viewDept();
        promptChoicesAction();
        // execute function viewRoles if user selection is "View roles"
      } else if (answer.action == "View roles") {
        queries.viewRoles();
        promptChoicesAction();
        // execute function addEmployee if user selection is "Add employee"
      } else if (answer.action == "Add employee") {
        queries.addEmployee();
        promptChoicesAction();
        // execute function addDept if user selection is "Add department"
      } else if (answer.action == "Add department") {
        queries.addDept();
        promptChoicesAction();
        // execute function addRole if user selection is "Add roles"
      } else if (answer.action == "Add role") {
        queries.addRole();
        promptChoicesAction();
        // execute function addRole if user selection is "Add roles"
      } else if (answer.action == "Edit employee") {
        queries.updateEmployee();
        promptChoicesAction();
        // execute function addRole if user selection is "Add roles"
      } else if (answer.action == "Remove employee") {
        queries.deleteEmployee();
        promptChoicesAction();
        // execute function EXIT if user selection is "EXIT"
      } else if (answer.action == "EXIT") {
        queries.exit();
      }
    });
}
