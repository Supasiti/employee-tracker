DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

-- create tables --

-- department --
DROP TABLE IF EXISTS department;
CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- role
DROP TABLE IF EXISTS role;
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,

  CONSTRAINT fk_role_department
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- employee
DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,

  CONSTRAINT fk_employee_manager
    FOREIGN KEY (manager_id) 
    REFERENCES employee(id)
    ON DELETE SET NULL,
  CONSTRAINT fk_employee_role
    FOREIGN KEY (role_id) 
    REFERENCES role(id)
    ON DELETE SET NULL
);