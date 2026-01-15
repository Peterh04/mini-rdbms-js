const DBError = require("./errors");

class Table {
  constructor(name, columns, database) {
    this.name = name;
    this.columns = columns;
    this.rows = [];
    this.autoIncrement = 1;
    this.database = database;
  }

  insert(data) {
    const row = { id: this.autoIncrement, ...data, createdAt: new Date() };

    // Primary key check
    if (this.columns.id.primary) {
      if (this.rows.find((r) => r.id === row.id)) {
        throw new Error(`Duplicate primary key ${row.id}`);
      }
    }

    for (const colName in this.columns) {
      if (this.columns[colName].unique) {
        if (this.rows.find((r) => r[colName] === row[colName])) {
          throw new DBError(
            `Duplicate unique value for column: ${colName}`,
            "UNIQUE"
          );
        }
      }
    }

    for (const colName in this.columns) {
      if (this.columns[colName].notNull) {
        if (row[colName] === null || row[colName] === undefined) {
          throw new DBError(`Column ${colName} cannot be null`, "NOT_NULL");
        }
      }
    }

    this.rows.push(row);
    this.autoIncrement++;
    this.database.saveToFile();
    return row;
  }

  selectAll() {
    return this.rows;
  }

  updateById(id, newData) {
    const row = this.rows.find((r) => r.id === id);
    if (!row) throw new Error(`Row with id ${id} not found`);
    Object.assign(row, newData);
    this.database.saveToFile();
    return row;
  }

  deleteById(id) {
    const index = this.rows.findIndex((r) => r.id === id);
    if (index === -1) throw new Error(`Row with id ${id} not found`);
    const deleted = this.rows.splice(index, 1);
    this.database.saveToFile();
    return deleted[0];
  }

  joinTables(table1, table2, key1, key2) {
    const results = [];

    table1.selectAll().forEach((row1) => {
      table2.selectAll().forEach((row2) => {
        if (row1[key1] === row2[key2]) {
          results.push({ ...row1, ...row2 });
        }
      });
    });

    return results;
  }
}

module.exports = Table;
