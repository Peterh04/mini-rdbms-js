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

const orderColumns = {
  id: { type: "INT", primary: true, unique: true },
  userId: { type: "INT" },
  amount: { type: "INT" },
};

db.createTable("Users", userColumns);
db.createTable("Orders", orderColumns);

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

runSQl(db, "INSERT INTO Orders (userId, amount) VALUES (1, 100)");

runSQl(db, "INSERT INTO Orders (userId, amount) VALUES (1, 250)");

runSQl(db, "INSERT INTO Orders (userId, amount) VALUES (2, 300)");

const orders = db.getTable("Orders");
const usersTable = db.getTable("Users");
const joined = runSQl(
  db,
  "SELECT * FROM Orders JOIN Users ON Orders.userId = Users.id"
);

const results = runSQl(db, "SELECT * FROM Orders");

console.log(joined);
