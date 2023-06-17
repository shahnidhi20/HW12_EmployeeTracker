const mysql = require("mysql2");

var veiwAllEmployees =
  "select emp.id, emp.first_name, emp.last_name, emp.manager_id as manager, r.title, r.salary, d.name from employees emp inner join role r on r.id = empt.role_id inner join department d on d.id = r.department_id";

var viewAllDepartment = "select id, name from department";

var viewAllRoles =
  "select r.id, r.title, r.salary, d.name as department from roles inner join department on d.id = r.department_id";

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    //SQL Password: "
    password: "Krishna2315",
    //database name
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

//Get all the employees from employees_db
exports.viewAllEmployees = function () {
  db.query(veiwAllEmployees, function (err, results) {
    if (err) {
      console.error(err);
    } else {
      console.table(results);
    }

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  });
};

//get all the departments from employees_db
exports.viewDept = function () {};

//get all the roles from employees_db
exports.viewRoles = function () {};

//add the employee to the employees_db
exports.addEmployee = function () {};

exports.addDept = function () {};

exports.addRole = function () {};

exports.updateEmployee = function () {};

exports.deleteEmployee = function () {};

//Update employee

exports.exit = function () {
  // terminate mySQL connection
  db.end();

  // say good bye
  console.log("Have a good one!");
};
