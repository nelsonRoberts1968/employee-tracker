-- CREATE DATABASE AND TABLES ===========================
DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;
USE employees_db;

-- Empoyees Table---
CREATE TABLE employees (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR (40),
  lastName VARCHAR (40),
  roleID INT,
  managerID INT
);


CREATE TABLE department (
  id INT(11) PRIMARY KEY,
  d_name VARCHAR (40)
);

-- Roles Table ---
CREATE TABLE role (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (30),
  salary DECIMAL(9,2),
  departmentID INT
);