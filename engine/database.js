const fs = require("fs");
const Table = require("./Table");

class Database {
  constructor() {
    this.tables = {};
  }

  createTable(name, columns) {
    if (this.tables[name]) {
      throw new Error(`Table${name} already exists`);
    }
    const table = new Table(name, columns, this);
    this.tables[name] = table;
    this.saveToFile();
  }

  getTable(name) {
    const table = this.tables[name];
    if (!table) throw new Error(`Table ${name} does not exist`);
    return table;
  }

  saveToFile() {
    const plainTables = {};
    for (const tableName in this.tables) {
      const table = this.tables[tableName];
      plainTables[tableName] = {
        name: table.name,
        columns: table.columns,
        rows: table.rows,
        autoIncrement: table.autoIncrement,
      };
    }
    fs.writeFileSync("db.json", JSON.stringify(plainTables, null, 2));
  }

  loadFromFile() {
    if (!fs.existsSync("db.json")) return;

    const data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
    for (const tableName in data) {
      const { name, columns, rows, autoIncrement } = data[tableName];
      const table = new Table(name, columns, this);
      table.rows = rows;
      table.autoIncrement = autoIncrement;
      this.tables[tableName] = table;
    }
  }
}

module.exports = Database;
