# Mini RDBMS in JavaScript

This project is a simplified Relational Database Management System (RDBMS) built from scratch using JavaScript.

Frontend: React.js
Backend: Express.js

It demonstrates how core database systems work internally, including SQL parsing, constraint enforcement, indexing, joins, persistence, and query execution.

✨ Features

SQL-style command interface

Table creation with schema definitions

Column constraints:

PRIMARY KEY

UNIQUE

NOT NULL

CRUD operations

Auto-incrementing IDs

Basic indexing for fast lookups

INNER JOIN support

Persistent storage to file

Interactive REPL mode

Error handling with custom DB errors

🏗 Architecture

The system is divided into four main layers:

Engine – Core database logic and storage

REPL – CommandLine SQL interface

API – Express server exposing DB functionality

Frontend – React client for interacting with the database

📦 Supported SQL Commands
Create Table
CREATE TABLE Users (
  id INT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

Insert
INSERT INTO Users (name, email) VALUES ('Alice', 'alice@gmail.com');

Select
SELECT * FROM Users;

WHERE Filters
SELECT * FROM Users WHERE id = 3;
SELECT * FROM Users WHERE name = 'Alice';

Update
UPDATE Users SET name='Alice Cooper' WHERE id=1;

Delete
DELETE FROM Users WHERE id=1;

Join
SELECT * FROM Users JOIN Orders ON Users.id = Orders.userId;

🛠 Tech Stack

Node.js

JavaScript

File-based persistence

Custom SQL parser

🎯 What This Project Demonstrates

This project demonstrates:

Database system design fundamentals

SQL parsing and command execution

Constraint enforcement

Index optimization

Join algorithms

Storage persistence

REPL systems

System design thinking

Problem solving

Fullstack engineering skills

All implemented by building a working mini-database engine from scratch.

🤝 Credits

This project was built independently with learning support from AI tools and Stack Overflow where appropriate. All architecture, logic, and implementation decisions were made, tested, and validated manually.
