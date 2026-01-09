class Table {
  constructor(name, columns) {
    this.name = name;
    this.columns = columns;
    this.rows = [];
    this.autoIncrement = 1;
  }

  insert(data) {
    const row = { id: this.autoIncrement, ...data, createdAt: new Date() };
    if (this.columns.id.primary) {
      if (this.rows.find((r) => r.id === row.id)) {
        throw new Error(`Duplicates of primary key ${row.id}`);
      }
    }

    for (const colName in this.columns) {
      if (this.columns[colName].unique) {
        if (this.rows.find((r) => r.colName) == row[colName]) {
          throw new Error(`Duplicate unique value for column: ${colName}`);
        }
      }
    }

    this.rows.push(row);
    this.autoIncrement++;
    return row;
  }

  selectAll() {
    return this.rows;
  }

  updateById(id, newData) {
    const row = this.rows.find((r) => r.id === id);
    if (!row) throw new Error(`Row with id ${id} not found`);
    Object.assign(row, newData);
    return row;
  }

  deleteById(id) {
    const index = this.rows.findIndex((r) => r.id === id);
    if (index === -1) throw new Error(`Row with id ${id} not found`);
    const deleted = this.rows.splice(index, 1);
    return deleted[0];
  }
}

module.exports = Table;
