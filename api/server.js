const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { runSQl } = require("../parser/sqlParser");
const Database = require("../engine/database");

const port = 5001;
const app = express();
const db = new Database();

app.use(cors());
app.use(bodyParser.json());

db.createTable("Users", {
  id: { type: "INT", primary: true, unique: true },
  name: { type: "TEXT" },
  email: { type: "TEXT", unique: true },
});

db.createTable("Orders", {
  id: { type: "INT", primary: true, unique: true },
  userId: { type: "INT" },
  amount: { type: "INT" },
});

app.post("/query", (req, res) => {
  const { sql } = req.body;

  try {
    const result = runSQl(db, sql);
    res.json({ success: true, result });
  } catch (err) {
    if (err.name === "DBError") {
      res.status(400).json({
        success: false,
        error: err.message,
        type: err.type,
      });
    } else {
      res.status(500).json({
        success: false,
        error: err.message,
        type: "UNKNOWN",
      });
    }
  }
});

app.listen(port, () => {
  console.log(`DB API runing on ${port}`);
});
