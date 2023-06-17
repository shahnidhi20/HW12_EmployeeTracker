const queries = require("/queries.js");

// array of actions to prompt user

const mainPrompt = [
  {
    name: "action",
    type: "list",
    message: "Select an action",
    choices: [
      "View employees",
      "View roles",
      "View departments",
      "Add department",
      "Add role",
      "Add employee",
      "Edit employee",
      "Remove employee",
      "EXIT",
    ],
  },
];

const addDepartmentQues = [
  {
    name: "DeplartmentQues",
    type: "input",
    message: "Please enter department name:",
  },
];

const addRoleQues = [
  {
    name: "RoleQuesTitle",
    type: "input",
    message: "Please enter role title:",
  },
  {
    name: "RoleQuesSalary",
    type: "input",
    message: "Please enter role salary:",
  },
  {
    name: "RoleQuesSalary",
    type: "input",
    message: "Please enter role salary:",
  },

  {
    name: "RoleQuesSalary",
    type: "list",
    message: "Please select the Department role belongs to :",
    choices: queries.getDepartments(),
  },
];

//TODO: Add employee

modules.exports = mainPrompt;
