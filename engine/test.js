const Database = require("./database");
const Table = require("./Table");

const db = new Database();

//Define Columnns
const userColumns = {
  id: { type: "INT", primary: true, unique: true },
  name: { type: "TEXT" },
  email: { type: "TEXT", unique: true },
};

db.createTable("Users", userColumns);

const users = db.getTable("Users");

//insert Rows
users.insert({ name: "Peter", email: "peter@gmail.com" });
users.insert({ name: "Agnes", email: "agnes@gmail.com" });

console.log(users.selectAll());

users.updateById(1, { name: "peter Heri" });

console.log(users.selectAll());

users.deleteById(2);
console.log(users.selectAll());
