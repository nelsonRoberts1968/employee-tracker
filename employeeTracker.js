const inquirer = require("inquirer");
const connection = require('./db/connection.js');
const consoleTable = require("console.table");

connection.connect(function(err) {
    if (err) throw err;
   
    console.log("Connected as ID " + connection.threadId);
    console.clear();
    console.log ("======================================");
    console.log ("");
    console.log ("   YOU ARE USING EMPLOYEES DATABASE   ");
    console.log ("");
    console.log ("======================================");
    readEmployeesDatabase();
  });

// user available list of choices

function readEmployeesDatabase() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do today?",
    name: "action",
    choices: [
            "View All Employees", 
            "View All Departments",
            "View All Roles",
            "View All Employees by Department",
            "View All Employees by Role",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Exit"
            ]
    }
]).then(function(answers) {
        switch (answers.action) {

            // Show all Employees
            case "View All Employees":
                showAllEmployees();
            break;

            // Show all departments
            case "View All Departments":
                showAllDepts();
            break;

             // Show all available roles
            case "View All Roles":
                showAllRoles();
            break;
                
            // Show employees by department
            case "View All Employees by Department":
                showEmployeesByDept();
            break;

            // Show employee by role
            case "View All Employees by Role":
                showEmployeesByRole();
            break;

            // Add department
            case "Add Department":
                addDept();
            break;

            // Add a Role
            case "Add Role":
                addRole();
            break;

            // Add Employee
            case "Add Employee":
                addEmployee();
            break;

            // Update employee saved role
            case "Update Employee Role":
                updateEmployeeRole();
            break;

        
            case "Exit":
                console.log ("===============================================");
                console.log ("");//Creating a space didnt know how to do it...
                console.log ("   THANK YOU FOR USING THE EMPLOYEE DATABASE   ");
                console.log ("");
                console.log ("===============================================");
                connection.end();
            break;
            }
    })
};

//Show all employees
function showAllEmployees() {
    
    connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name,role.title AS Title, role.salary AS Salary, department.d_name AS Department, CONCAT(e.firstName, ' ' ,e.lastName) AS Manager FROM employees INNER JOIN role on role.id = employees.roleID INNER JOIN department on department.id = role.departmentID LEFT JOIN employees e on employees.managerID = e.id;", 
    function(err, res) {
      if (err) throw err
      console.log ("");
      console.log("*** EMPLOYEES LIST ***");
      console.log ("");
      console.table(res)
      readEmployeesDatabase()
  })
}

// Show all departments
function showAllDepts() {
    connection.query("SELECT department.id AS ID, department.d_name AS Department FROM department",
    function(err, res) {
      if (err) throw err
      console.log("")
      console.log("*** DEPARTMENT LIST ***")
      console.log("")
      console.table(res)
      readEmployeesDatabase()
  })
}

// Show all Roles
function showAllRoles() {
    connection.query("SELECT role.id AS Dept_ID, role.title AS Title FROM role",
    function(err, res) {
      if (err) throw err
      console.log("")
      console.log("*** ROLE LIST ***")
      console.log("")
      console.table(res)
      readEmployeesDatabase()
  })
}

// Show emloyees by their departments
function showEmployeesByDept() {
  connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, department.d_name AS Department FROM employees JOIN role ON employees.roleID = role.id JOIN department ON role.departmentID = department.id ORDER BY department.id;", 
  function(err, res) {
    if (err) throw err
    console.log ("");
    console.log("*** EMPLOYEES LIST BY DEPARTMENT ***")
    console.log ("");
    console.table(res)
    readEmployeesDatabase()
  })
}

// Show employees by role
function showEmployeesByRole() {
  connection.query("SELECT employees.firstName AS First_Name, employees.lastName AS Last_Name, role.title AS Title FROM employees JOIN role ON employees.roleID = role.id ORDER BY role.id", 
  function(err, res) {
  if (err) throw err
  console.log ("");
  console.log("*** EMPLOYEES BY ROLE ***")
  console.log ("");
  console.table(res)
  readEmployeesDatabase()
  })
}

//Role Array
let roleArr = [];                                            
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  })
  return roleArr;
}

// Manager Array
let managersArr = [];
function selectManager() {
  connection.query("SELECT firstName, lastName FROM employees", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArr.push(res[i].firstName);
    }
  })
  return managersArr;
}

// Selecting department name
var departmentArray = [];
function selectDepartment() {
  connection.query("SELECT * FROM department", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
        departmentArray.push(res[i].d_name);
    }
})
return departmentArray;
}

// adding a new employee
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "First Name: "
        },
        {
          name: "lastName",
          type: "input",
          message: "Last Name: "
        },
        {
          name: "role",
          type: "list",
          message: "What is the new employee's title? ",
          choices: selectRole()//Select from  role function
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Who is managing the new employee? ",
            choices: selectManager()//Select from manager function
        }

    ]).then(function (answers) {
      var roleId = selectRole().indexOf(answers.role) + 1
      var managerId = selectManager().indexOf(answers.choice) + 1
      connection.query("INSERT INTO employees SET ?", 
      {
          firstName: answers.firstName,
          lastName: answers.lastName,
          managerID: managerId,
          roleID: roleId
          
      }, 
      function(err){
          if (err) throw err
          console.table(answers)
          readEmployeesDatabase()
      })

  })
 }
// Update Employee Role
function updateEmployeeRole() {
    connection.query("SELECT employees.lastName, role.title FROM employees JOIN role ON employees.roleID = role.id;", 
    (err, res) => {
            if (err) throw err;
 
            inquirer.prompt([
                {
                    name: "lastName",
                    type: "rawlist",
                    choices: function () {
                        var lastName = [];
                        for (var i = 0; i < res.length; i++) {
                            lastName.push(res[i].lastName);
                        }
                        return lastName;
                    },
                    message: "What is the employee's last name? ",
                },
                {
                    name: "role",
                    type: "rawlist",
                    message: "What is the employee's new title? ",
                    choices: selectRole()
                },
            ]).then(function (answers) {
                var roleId = selectRole().indexOf(answers.role) + 1;
                connection.query("UPDATE employees SET WHERE ?",
                    {
                        lastName: answers.lastName,
                        roleID: roleId
                    },
        
                    function (err) {
                        if (err)
                            throw err;
                        console.table(answers);
                        runEmployeeDB();
                    });
            });
        });
  }

// Adding departments
function addDept() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add? "
        },
        {
            name: "id",
            type: "input",
            message: "What is the new Department Id number? "
          }

    ]).then(function(answers) {
        connection.query("INSERT INTO department SET ? ",
            {
              name: answers.d_name,
              id: answers.id
            },
            function(err) {
                if (err) throw err
                console.table(res);
                readEmployeesDatabase();
            }
        )
    })
  }

  // Add Add roles
  function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;",   function(err, res) {
      inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What is name of the new role?"
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary for the new role?"
          } ,
          {
            name: "department",
            type: "rawlist",
            message: "Under which department does this new role belong?",
            choices: selectDepartment()
          }
      ]).then(function(answers) {
          var deptId = selectDepartment().indexOf(answers.choice) + 1
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: answers.title,
                salary: answers.salary,
                departmentID: deptId
              },
              function(err) {
                  if (err) throw err
                  console.table(answers);
                  readEmployeesDatabase();
              }
          )     
      });
    });
};

