const inquirer = require("inquirer");
const queries = require("./queires.js");
const e = require("express");
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

var departments = [];
var roles = [];
var employees = [];

// #region helper function to get the emp , roles and department
function getDepartIDfromName(departments, name) {
  return departments.find((u) => u.name === name) || null;
}

function getRoleIDfromName(title) {
  return roles.find((u) => u.title === title) || null;
}

function getEmpIDfromName(empName) {
  // console.log("Find Employess from : ", employees);
  return employees.find((u) => u.Emp_Name === empName) || null;
}
// #endregion

// #region Prompt Selections from USER
exports.promptChoicesAction = async function mainPromptfunc() {
  //get the employees and roles from the DB and load the cache.
  if (employees.length <= 0) employees = await queries.getEmployees();
  if (roles.length <= 0) roles = await queries.viewRoles();
  // prompt user actions using inquirer
  //prompt is not aysnc then need to use the then
  inquirer
    .prompt(mainPrompt)
    // await user responce from inquirer
    .then(function (answer) {
      // execute function viewAll if user selection is "View employees"
      if (answer.action == "View employees") {
        queries.getEmployees().then(function (response) {
          employees = response;
          console.table(response);
          mainPromptfunc();
        });

        // execute function viewDept if user selection is "View departments"
      } else if (answer.action == "View departments") {
        queries.viewDept().then(function (response) {
          console.table(response);
          mainPromptfunc();
        });

        // execute function viewRoles if user selection is "View roles"
      } else if (answer.action == "View roles") {
        queries.viewRoles().then(function (response) {
          console.table(response);
          mainPromptfunc();
        });

        // execute function addEmployee if user selection is "Add employee"
      } else if (answer.action == "Add employee") {
        //propmt the questions to get th first name,
        //last name, role choices and manager list choices

        //if roles are present then allow to add the employees

        if (roles.length <= 0) {
          queries
            .viewRoles()
            .then(function (results) {
              roles = results;
            })
            .then(function () {
              //get the name , role choices and manager list choices

              inquirer.prompt(addEmpQues).then(function (ans) {
                //get the id of the role and manager id from employee

                //validate the role and manager selectied role.
                var empByName = getEmpIDfromName(ans.EmpManager);

                var rolebyTitle = getRoleIDfromName(ans.EmpRole);
                var emptID = 0;
                // var empByName = getManagerIDfromName(ans.EmpManager);
                if (empByName != null) emptID = empByName.Id;

                console.log("Empl manager ID found: ", emptID);
                queries
                  .addEmployee(
                    ans.EmpQFName,
                    ans.EmpQLName,
                    rolebyTitle.id,
                    emptID
                  )
                  .then(function () {
                    queries.getEmployees().then(function (response) {
                      employees = response;
                      mainPromptfunc();
                    });
                  });
              });
            });
        } else {
          //roles are present in the cache
          //get the name , role choices and manager list choices

          inquirer.prompt(addEmpQues).then(function (ans) {
            //validate the role and manager selectied role.
            var empByName = getEmpIDfromName(ans.EmpManager);
            //validate the role and manager selectied role.

            var rolebyTitle = getRoleIDfromName(ans.EmpRole);
            var emptID = 0;
            // var empByName = getManagerIDfromName(ans.EmpManager);
            if (empByName != null) emptID = empByName.Id;

            console.log("Empl manager ID found: ", emptID);
            queries
              .addEmployee(ans.EmpQFName, ans.EmpQLName, rolebyTitle.id, emptID)
              .then(function () {
                queries.getEmployees().then(function (response) {
                  employees = response;
                  mainPromptfunc();
                });
              });
          });
        }

        // execute function addDept if user selection is "Add department"
      } else if (answer.action == "Add department") {
        inquirer.prompt(addDepartmentQues).then(function (ans) {
          console.log("Dept name ", ans);
          queries.addDept(ans.DeplartmentQues);
        });

        // execute function addRole if user selection is "Add roles"
      } else if (answer.action == "Add role") {
        queries
          .viewDept()
          .then(function (response) {
            //cache the departments list for later
            departments = response;
          }) //once the departs are loaded then call the user prompt function to get the details of the role to be inserted
          .then(function () {
            inquirer.prompt(addRoleQues).then(function (ans) {
              //get the department ID from department based on the department name
              var departmentId = getDepartIDfromName(
                departments,
                ans.RoleQuDept
              );

              //   title = ans.RoleQTitle;
              //   salary = ans.RoleQSalary;
              //   deptID = departmentId;
              console.log("Role Details ", ans, departmentId.id);

              queries
                .addRole(ans.RoleQTitle, ans.RoleQSal, departmentId.id)
                .then(function () {
                  mainPromptfunc();
                });
            });
          });

        // execute function addRole if user selection is "Add roles"
      } else if (answer.action == "Edit employee") {
        if (employees.length > 0) {
          inquirer
            .prompt(updateEmpSelection)
            .then(function (answers) {
              var empByName = getEmpIDfromName(answers.EmpUpdateName);

              //emp found now show the role selection
              inquirer.prompt(rolesSelection).then(function (answers) {
                //get the role ID
                var role = getRoleIDfromName(answers.EmpRole);

                //found the role and now call the update DB query to update the role of the employee
                queries
                  .updateEmployeeRole(role.id, empByName.Id)
                  .then(function (result) {
                    //update the cache
                    queries.getEmployees().then(function (response) {
                      employees = response;
                      mainPromptfunc();
                    });
                  });
              });
            })
            .catch(function (err) {
              console.error(err);
            });
        } else {
          console.log("No Employee found for the update.");
          mainPromptfunc();
        }

        // which employee role needs to be updated?
        // by id, show the roles and select one of them
        // get the role by title and update the employee role
        // execute function addRole if user selection is "Add roles"
      } else if (answer.action == "Remove employee") {
        //show the employees list and get the id of the employee to be deleted
        inquirer
          .prompt(deleteEmpQues)
          .then(function (ans) {
            console.log(ans);
            var employee = getEmpIDfromName(ans.EmpDelName);
            queries.deleteEmployee(employee.Id).then(function () {
              //update employee cache.
              queries.getEmployees().then(function (response) {
                employees = response;
                mainPromptfunc();
              });
            });
          })
          .catch(function (err) {
            console.error(err);
          });
        // execute function EXIT if user selection is "EXIT"
      } else if (answer.action == "EXIT") {
        queries.exit();
      }
    });
};
// #endregion

// #region Questions for user selections for Add Role, Add Depart, Add employees and Update and Delete
const addDepartmentQues = [
  {
    name: "DeplartmentQues",
    type: "input",
    message: "Please enter department name:",
  },
];

const addRoleQues = [
  {
    name: "RoleQTitle",
    type: "input",
    message: "Please enter role title:",
  },
  { name: "RoleQSal", type: "input", message: "Please enter role salary:" },
  {
    name: "RoleQuDept",
    type: "list",
    message: "Please selct the Department",
    choices: function () {
      return departments.map((el) => el.name);
      //   queries.viewDept().then(function (departments) {
      //     console.log(departments.length);

      //     return departments.map((el) => el.name);
      //   });
    },
  },
];

const addEmpQues = [
  {
    name: "EmpQFName",
    type: "input",
    message: "Please enter First name:",
  },
  {
    name: "EmpQLName",
    type: "input",
    message: "Please enter Last name:",
  },
  {
    name: "EmpRole",
    type: "list",
    message: "Please select Role:",
    choices: function () {
      return roles.map((el) => el.title);
    },
  },
  {
    name: "EmpManager",
    type: "list",
    message: "Please select Manager:",
    choices: function () {
      var empNames = employees.map((emp) => emp.Emp_Name);
      empNames.unshift("None");
      return empNames;
    },
  },
];

deleteEmpQues = [
  {
    name: "EmpDelName",
    type: "list",
    message: "Please select the Employee to delete:",
    choices: function () {
      var empNames = employees.map((emp) => emp.Emp_Name);
      return empNames;
    },
  },
];

updateEmpSelection = [
  {
    name: "EmpUpdateName",
    type: "list",
    message: "Please select the Employee whose role needs to be modified:",
    choices: function () {
      var empNames = employees.map((emp) => emp.Emp_Name);
      return empNames;
    },
  },
];

rolesSelection = [
  {
    name: "EmpRole",
    type: "list",
    message: "Please select Role:",
    choices: function () {
      return roles.map((el) => el.title);
    },
  },
];

// #endregion
