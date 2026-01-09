# Mini RDBMS in JavaScript

This project is a simplified Relational Database Management System (RDBMS) built using JavaScript and Node.js.

It supports:

- Table creation
- CRUD operations
- Primary and unique keys
- Basic indexing
- Table joins
- SQL-like query parsing
- REPL terminal interface
- REST API layer
- React frontend demo

## Architecture

The system is divided into layers:

- Engine: Core database logic
- REPL: Command line interface
- API: Express server
- Frontend: React client

## Tables

Users:

- id (PK)
- name
- email (unique)
  -createdAt

Orders:

- id (PK)
- userId (FK)
- amount
  -createdAt

## Goal

This project demonstrates system design, problem solving, and full-stack engineering skills by building a working mini-database engine from scratch.
