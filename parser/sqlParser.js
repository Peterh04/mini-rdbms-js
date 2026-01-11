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
  } else if (command.toUpperCase().includes("JOIN")) {
    return handleInnerJoin(db, command);
  } else {
    throw new Error("Unsupported SQL command");
  }
}

const handleInsert = (db, command) => {
  const regex = /INSERT INTO (\w+)\s*\((.+)\)\s*VALUES\s*\((.+)\)/i;
  const match = command.match(regex);

  if (!match) throw new Error("Invalid INSERT syntax");

  const [, tableName, columnns, values] = match;

  const colArray = columnns.split(",").map((column) => column.trim());
  const valArray = values.split(",").map((value) => {
    value = value.trim();
    if (!isNaN(value)) return Number(value);
    return value.replace(/^'|'$/g, "");
  });

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

const handleInnerJoin = (db, command) => {
  const regex =
    /SELECT\s+\*\s+FROM\s+(\w+)\s+JOIN\s+(\w+)\s+ON\s+(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/i;

  const match = command.match(regex);
  if (!match) throw new Error("Invalid JOIN syntax");

  const [, table1Name, table2Name, key1, key2] = match;

  const table1 = db.getTable(table1Name);
  const table2 = db.getTable(table2Name);

  return table1.joinTables(table1, table2, key1, key2);
};
module.exports = { runSQl };
