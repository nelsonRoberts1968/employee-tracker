
-- All departments


INSERT INTO department (id, d_name) VALUES (1, 'Engineering');
INSERT INTO department (id, d_name) VALUES (2, 'Sales');
INSERT INTO department (id, d_name) VALUES (3, 'Finance');
INSERT INTO department (id, d_name) VALUES (4, 'Legal');
INSERT INTO department (id, d_name) VALUES (5, 'Human Rescources');

-- Employee Roles

INSERT INTO role (title, salary, departmentID) VALUES ("Lead Engineer", 150000, 1);
INSERT INTO role (title, salary, departmentID) VALUES ("Software Engineer", 145000, 1);

INSERT INTO role (title, salary, departmentID) VALUES ("Sales Mgr.", 130000, 2);
INSERT INTO role (title, salary, departmentID) VALUES ("Sales Lead II.", 115000, 2);
INSERT INTO role (title, salary, departmentID) VALUES ("Sales Director", 158000, 2);

INSERT INTO role (title, salary, departmentID) VALUES ("Director Of Finance", 175000, 3);
INSERT INTO role (title, salary, departmentID) VALUES ("Book Keeper", 75000, 3);
INSERT INTO role (title, salary, departmentID) VALUES ("Procurement", 113000, 3);

INSERT INTO role (title, salary, departmentID) VALUES ("Lawyer", 195000, 4);
INSERT INTO role (title, salary, departmentID) VALUES ("Head Lawyer", 265000, 4);

INSERT INTO role (title, salary, departmentID) VALUES ("Operations Manager", 155000, 5);

INSERT INTO role (title, salary, departmentID) VALUES ("HR Director", 95000, 5);

-- Seeeding All available employees


INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Nelson', 'Roberts Mmbando',1, null );
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Slim', 'Shady', 2, 1);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Joe', 'Biden', 3, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Barack', 'Obama', 4, 3);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Ryan', 'Goslin',5, 3);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Henry', 'Ford', 6, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Nikola', 'Tesla', 7, 6);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Elon', 'Musk', 8, 6);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Mark', 'Zuckerberg', 9, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Joe', 'Rogan', 5, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Zinedin', 'Zidane', 2, 1);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Bill', 'Gates', 11, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('John', 'Deere', 7, 6);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Tommy', 'Shelby', 2, 1);
