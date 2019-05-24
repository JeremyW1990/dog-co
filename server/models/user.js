const db = require('../../database/mysql.config');

module.exports = class Product {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  save() {
    return db.execute(
      'INSERT INTO users (name, price, email, password) VALUES (?, ?, ?, ?)',
      [this.name, this.price, this.email, this.password]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM users');
  }

  static findById(id) {
    return db.execute('SELECT * FROM users WHERE users.id = ?', [id]);
  }
};