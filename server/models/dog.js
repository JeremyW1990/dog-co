const db = require('../../database/mysql.config');

module.exports = class Product {
  constructor(id, name, age, breed, user_id) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.breed = breed;
    this.user_id = user_id;
  }

  save() {
    return db.execute(
      'INSERT INTO dogs (name, price, age, breed, user_id) VALUES (?, ?, ?, ?)',
      [this.name, this.price, this.age, this.breed, this.user_id]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM dogs');
  }

  static findById(id) {
    return db.execute('SELECT * FROM udogsers WHERE dogs.id = ?', [id]);
  }
};