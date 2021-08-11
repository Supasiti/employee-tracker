INSERT INTO department (name)
  VALUES
    ("Sales"),
    ("Finance"),
    ("Research"),
    ("Operation");

INSERT INTO role (title, salary, department_id)
  VALUES
    ("Sales Manager", 80000, 1),  -- 1
    ("CFO", 100000, 2),  -- 2
    ("CTO", 120000, 3),  -- 3
    ("CEO", 200000, 4),  -- 4
    ("Engineer", 80000, 4),  -- 5 
    ("Accountant", 60000, 2), -- 6
    ("Scientist", 90000, 3),  -- 7
    ("Sales Junior", 40000, 1); -- 8


INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES
    ('Mary',     'Sluis',     4, null), -- 1 -- 
    ('Bezalel',  'Simmel',    1, 1), -- 2--
    ('Kyoichi',  'Maliniak',  2, 1), -- 3--
    ('Saniya',   'Kalloufi',  3, 1), -- 4--
    ('Patricio', 'Bridgland', 5, 1), -- 5--
    ('Eberhardt','Terkki',    5, 1), -- 6--

    ('Parto',    'Bamford',   8, 2), 
    ('Chirstian','Koblick',   8, 2), 

    ('Anneke',   'Preusig',   6, 3), 
    ('Tzvetan',  'Zielinski', 6, 3), 
    
    ('Sumant',   'Peac',      7, 4), 
    ('Duangkaew','Piveteau',  7, 4); 
    

