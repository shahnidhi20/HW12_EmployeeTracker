<h1 align="center">README.md Employee Tracker </h1>
   
## Description
  
🔍 A node.js application which demonstrates the different CRUD operations for the Empoloyees working.
Following Crud operations are supported in the application: 
1. View all the employees
2. View the Departments 
3. View all the Roles
4. Add a new department
5. Add a new Role 
6. Add an employee 
7. Update the Employee role
8. Delete the Employee.
  
💻 Below is the gif showing the functionality of the application:
  
![EMP-TRACKER](./output/emp-tracker.gif)
  
The full movie file showing functionality of the application can be found [here](./video/EMP_TRACKER.webm)  
  
## User Story
  
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```
  
## Acceptance Criteria
  
``` 
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```
  
## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation

`npm init`

`npm install inquirer@8.2.4`

`npm install mysql2`

## Usage

Run the following command at th root of your project and answer the prompted questions:

`node server.js` OR

`npm start`

## Contributing

- [Nidhi Shah](https://github.com/shahnidhi20/)
