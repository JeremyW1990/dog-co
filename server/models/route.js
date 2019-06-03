const db = require('../../database/mysql.config');

module.exports = class Route {
  constructor(id, beneficiary_id, provider_id, status) {
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

  static fetchAllByUserId(user_id) {
    return db.execute('SELECT * FROM routes WHERE beneficiary_id = ?', [user_id]);
  }

  static findById(id) {
    return db.execute('SELECT * FROM routes WHERE routes.id = ?', [id]);
  }
};