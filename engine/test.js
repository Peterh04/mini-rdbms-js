const { runSQl } = require("../parser/sqlParser");
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

runSQl(
  db,
  "INSERT INTO Users (name,email) VALUES ('Peter', 'peter@gmail.com')"
);
runSQl(
  db,
  "INSERT INTO Users (name, email) VALUES ('Agnes', 'agnes123@gmai.com')"
);

runSQl(db, "DELETE FROM Users WHERE id = 2");

runSQl(
  db,
  "UPDATE Users SET name='Ivyne', email='Ivyne123@gmail.com' WHERE id=1"
);

const results = runSQl(db, "SELECT * FROM Users");
console.log(results);
