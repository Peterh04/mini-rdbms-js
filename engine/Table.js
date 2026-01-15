const DBError = require("./errors");

class Table {
  constructor(name, columns, database) {
    this.name = name;
    this.columns = columns;
    this.rows = [];
    this.autoIncrement = 1;
    this.database = database;
    this.indexes = {};
  }

  insert(data) {
    const row = { id: this.autoIncrement, ...data, createdAt: new Date() };

    for (const col in this.columns) {
      if (this.columns[col].primary || this.columns[col].unique) {
        const exists = this.rows.find((r) => r[col] === row[col]);
        if (exists) {
          throw new DBError(`Duplicate value for column: ${col}`, "UNIQUE");
        }
      }
      if (
        this.columns[col].notNull &&
        (row[col] === null || row[col] === undefined)
      ) {
        throw new DBError(`Column ${col} cannot be null`, "NOT_NULL");
      }
    }

    this.rows.push(row);

    for (const col in row) {
      if (!this.indexes[col]) this.indexes[col] = {};
      const val = row[col]?.toString();
      if (!this.indexes[col][val]) this.indexes[col][val] = [];
      this.indexes[col][val].push(row);
    }

    this.autoIncrement++;
    this.database.saveToFile();
    return row;
  }

  selectAll() {
    return this.rows;
  }

  selectWhere(column, value) {
    if (!column || value === undefined || value === null)
      return this.selectAll();

    value = value.toString();

    if (this.indexes[column] && this.indexes[column][value]) {
      return this.indexes[column][value];
    }

    return this.rows.filter((r) => r[column]?.toString() === value);
  }

  updateById(id, newData) {
    const row = this.rows.find((r) => r.id === id);
    if (!row) throw new Error(`Row with id ${id} not found`);

    for (const col in newData) {
      const oldVal = row[col]?.toString();

      if (this.indexes[col] && this.indexes[col][oldVal]) {
        this.indexes[col][oldVal] = this.indexes[col][oldVal].filter(
          (r) => r !== row
        );
        if (this.indexes[col][oldVal].length === 0)
          delete this.indexes[col][oldVal];
      }

      row[col] = newData[col];

      if (!this.indexes[col]) this.indexes[col] = {};
      const newVal = newData[col]?.toString();
      if (!this.indexes[col][newVal]) this.indexes[col][newVal] = [];
      this.indexes[col][newVal].push(row);
    }

    this.database.saveToFile();
    return row;
  }

  deleteById(id) {
    const index = this.rows.findIndex((r) => r.id === id);
    if (index === -1) throw new Error(`Row with id ${id} not found`);
    const row = this.rows.splice(index, 1)[0];

    for (const col in row) {
      const val = row[col]?.toString();
      if (this.indexes[col] && this.indexes[col][val]) {
        this.indexes[col][val] = this.indexes[col][val].filter(
          (r) => r !== row
        );
        if (this.indexes[col][val].length === 0) delete this.indexes[col][val];
      }
    }

    this.database.saveToFile();
    return row;
  }

  joinTables(table1, table2, key1, key2) {
    const results = [];
    table1.selectAll().forEach((row1) => {
      table2.selectAll().forEach((row2) => {
        if (row1[key1] === row2[key2]) results.push({ ...row1, ...row2 });
      });
    });
    return results;
  }
}

module.exports = Table;
