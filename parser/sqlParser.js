function runSQl(db, command) {
  command = command.trim();

  if (command.toUpperCase().startsWith("INSERT INTO")) {
    return handleInsert(db, command);
  } else if (command.toUpperCase().startsWith("SELECT")) {
    return handleSelect(db, command);
  } else if (command.toUpperCase().startsWith("DELETE")) {
    return handleDelete(db, command);
  } else if (command.toUpperCase().startsWith("UPDATE")) {
    return handleUpdate(db, command);
  } else {
    throw new Error("Umsupported SQL command");
  }
}

const handleInsert = (db, command) => {
  const regex = /INSERT INTO (\w+)\s*\((.+)\)\s*VALUES\s*\((.+)\)/i;
  const match = command.match(regex);

  if (!match) throw new Error("Invalid INSERT syntax");

  const [, tableName, columnns, values] = match;

  const colArray = columnns.split(",").map((column) => column.trim());
  const valArray = values
    .split(",")
    .map((value) => value.trim().replace(/^'|'$/g, ""));

  const row = {};
  colArray.forEach((col, idx) => {
    row[col] = valArray[idx];
  });

  const table = db.getTable(tableName);
  return table.insert(row);
};

const handleSelect = (db, command) => {
  const regex = /SELECT\s+\*\s+FROM\s+(\w+)/i;
  const match = command.match(regex);

  if (!match) throw new Error("Invalid SELECT syntax");

  const tableName = match[1];
  const table = db.getTable(tableName);
  return table.selectAll();
};

const handleDelete = (db, command) => {
  const regex = /DELETE FROM (\w+)\s*WHERE\s*id\s*=\s*(\d+)/i;
  const match = command.match(regex);

  if (!match) throw new Error("Invalid DELETE syntax");

  const tableName = match[1];
  const id = parseInt(match[2]);

  const table = db.getTable(tableName);
  return table.deleteById(id);
};

const handleUpdate = (db, command) => {
  const regex = /UPDATE\s+(\w+)\s+SET\s+(.+?)\s+WHERE\s+id\s*=\s*(\d+)/i;
  const match = command.match(regex);

  if (!match) return new Error("Invalid UPDATE sytax");

  const [, tableName, setPart, id] = match;

  const updates = {};
  setPart.split(",").forEach((pair) => {
    const [col, val] = pair
      .split("=")
      .map((s) => s.trim().replace(/^'|'$/g, ""));
    updates[col] = val;
  });

  const table = db.getTable(tableName);
  return table.updateById(parseInt(id), updates);
};
module.exports = { runSQl };
