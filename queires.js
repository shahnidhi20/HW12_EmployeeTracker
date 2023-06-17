var veiwAllEmployees =
  "select emp.id, emp.first_name, emp.last_name, r.title, r.salary, d.name from employees emp inner join role r on r.id = empt.role_id inner join department d on d.id = r.department_id";

var viewAllDepartment = "select id, name from department";

var viewAllRoles =
  "select r.id, r.title, r.salary, d.name as department from roles inner join department on d.id = r.department_id";

///update the role

//add employee

//add department and role

//Update employee
