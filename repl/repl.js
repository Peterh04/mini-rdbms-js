const readline = require("readline");
const { runSQl } = require("../parser/sqlParser");
const Database = require("../engine/database");

const db = new Database();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "mini-db>",
});

rl.prompt();

rl.on("line", (line) => {
  const command = line.trim();

  if (command.toLowerCase() === "exit") {
    rl.close();
    return;
  }

  try {
    const result = runSQl(db, command);
    console.log(result);
  } catch (err) {
    console.error("Error", err.message);
  }

  rl.prompt();
});
