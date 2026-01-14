class DBError extends Error {
  constructor(message, type) {
    super(message), (this.name = "DBError"), (this.type = type);
  }
}

module.exports = DBError;
