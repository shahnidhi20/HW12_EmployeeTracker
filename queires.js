//const db = require("./connection.js");

//const mysql = require("mysql2");

const mysql = require("mysql2/promise");
// const choices = require("./choices.js");

// var veiwAllEmployees = `select emp.id as Id,
// concat(emp.first_name,' ',emp.last_name) as Emp_Name,
// emp.manager_id as Manager,
// r.title as Role_Title,
// r.salary as Salary,
// d.name as Dept_Name
// from employee emp inner join role r on r.id = emp.role_id inner join department d on d.id = r.department_id`;

var veiwAllEmployees = `select emp.id as Id,
concat(emp.first_name,' ',emp.last_name) as Emp_Name,
concat(manager.first_name,' ',manager.last_name) as Manager,
r.title as Role_Title,
r.salary as Salary,
d.name as Dept_Name
from employee emp
LEFT OUTER JOIN employee manager ON manager.id = emp.manager_id
inner join role r on r.id = emp.role_id inner join department d on d.id = r.department_id;`;

var viewAllDepartment = "select id, name from department";

var viewAllRoles = `select r.id, r.title, r.salary, d.name as department from role r 
   inner join department d on d.id = r.department_id`;

exports.getEmployees = async function () {
  const conn = await mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    //SQL Password: "
    password: "Krishna2315",
    //database name
    database: "employees_db",
  });

  //TODO: add check if DB is connected
  const [rows] = await conn.execute(veiwAllEmployees);
  if (rows.length > 0) {
    console.log("Employees found: " + rows.length);
  } else {
    console.log("No Employess found..Please add the Employee");
  }
  await conn.end();
  return rows;
};

//get all the departments from employees_db
exports.viewDept = async function () {
  const conn = await mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    //SQL Password: "
    password: "Krishna2315",
    //database name
    database: "employees_db",
  });

  //TODO: add check if DB is connected
  const [rows] = await conn.execute(viewAllDepartment);

  await conn.end();

  return rows;
};

//get all the roles from employees_db
exports.viewRoles = async function () {
  const conn = await mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    //SQL Password: "
    password: "Krishna2315",
    //database name
    database: "employees_db",
  });

  //TODO: add check if DB is connected
  const [rows] = await conn.execute(viewAllRoles);
  // console.table(rows);
  await conn.end();
  return rows;
};

//add the employee to the employees_db
exports.addEmployee = async function (fName, lName, roleID, manageID) {
  if (manageID == 0) {
    manageID = null;
  }
  var addEmpSQL = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                         VALUES ('${fName}', '${lName}', ${roleID}, ${manageID})`;

  const conn = await mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    //SQL Password: "
    password: "Krishna2315",
    //database name
    database: "employees_db",
  });

  //TODO: add check if DB is connected
  const [rows] = await conn.execute(addEmpSQL);

  if (rows.affectedRows > 0) {
    console.log(
      `Employee ${fName} ${lName} is added successfully, ID is ${rows.insertId}`
    );
  } else {
    console.log("Insert for Eployee failed");
  }

  await conn.end();
};

exports.addDept = async function (name) {
  var addDepartmentSQL = `INSERT INTO department (name) values ("${name}")`;

  const conn = await mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    //SQL Password: "
    password: "Krishna2315",
    //database name
    database: "employees_db",
  });

  //TODO: add check if DB is connected
  const [rows] = await conn.execute(addDepartmentSQL);

  if (rows.affectedRows > 0) {
    console.log(
      `Department ${name} is added successfully, ID is ${rows.insertId}`
    );
  } else {
    console.log("Insert for department failed");
  }

  await conn.end();
};

//Role Added
exports.addRole = async function (title, salary, department) {
  var addDepartmentSQL = `INSERT INTO role (title, salary, department_id) values ("${title}", ${salary}, ${department})`;

  const conn = await mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    //SQL Password: "
    password: "Krishna2315",
    //database name
    database: "employees_db",
  });

  //TODO: add check if DB is connected
  const [rows] = await conn.execute(addDepartmentSQL);

  if (rows.affectedRows > 0) {
    console.log(`Role ${title} is added successfully, ID is ${rows.insertId}`);
  } else {
    console.log("Insert for Role failed");
  }

  await conn.end();
};

//Update Employee Role
exports.updateEmployeeRole = async function (roleid, empId) {
  var updateEmpRoleSQL = `UPDATE employee set role_id = ${roleid} where Id = ${empId}`;

  const conn = await mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    //SQL Password: "
    password: "Krishna2315",
    //database name
    database: "employees_db",
  });

  //TODO: add check if DB is connected
  const [rows] = await conn.execute(updateEmpRoleSQL);

  if (rows.affectedRows > 0) {
    console.log(`Employee Role is updated to ${roleid}`);
  } else {
    console.log("Update for Role failed");
  }
  await conn.end();
};

exports.deleteEmployee = async function (empId) {
  var delteEmpSQL = `DELETE FROM employee where Id = ${empId}`;

  const conn = await mysql.createConnection({
    host: "localhost",
    // MySQL username,
    user: "root",
    //SQL Password: "
    password: "Krishna2315",
    //database name
    database: "employees_db",
  });

  //TODO: add check if DB is connected
  const [rows] = await conn.execute(delteEmpSQL);

  if (rows.affectedRows > 0) {
    console.log(`Employee ${empId} is deleted successfully.`);
  } else {
    console.log("Delete of Employee failed");
  }
  await conn.end();
};

exports.exit = function () {
  // terminate mySQL connection
  // say good bye
  console.log("Have a good one!");
};
