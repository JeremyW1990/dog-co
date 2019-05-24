const db = require('../../database/mysql.config');

module.exports = class Route {
  constructor(id, beneficiary_id, provider_id, status, user_id) {
    this.id = id;
    this.beneficiary_id = beneficiary_id;
    this.provider_id = provider_id;
    this.status = status;
  }

  save() {
    return db.execute(
      'INSERT INTO routes (beneficiary_id, provider_id, status) VALUES (?, ?, ?)',
      [this.beneficiary_id, this.provider_id, this.status]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM routes');
  }

  static findById(id) {
    return db.execute('SELECT * FROM routes WHERE routes.id = ?', [id]);
  }
};