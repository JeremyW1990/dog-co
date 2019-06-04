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

  static fetchAllByRequestType(user_id, requestType) {//my-walk, walk-for-me

    if (requestType === 'my-walk'){
      return db.execute(`SELECT R.id, U.username AS 'i-walk-for', status, create_at, start_at, complete_at 
      FROM routes AS R
      LEFT JOIN users AS U 
      ON beneficiary_id = U.id
      WHERE ( provider_id = ? AND status !='completed')`, [user_id]);
    };

    if (requestType === 'walk-for-me'){
      return db.execute(`SELECT R.id, U.username AS 'my-walker', status, create_at, start_at, complete_at 
      FROM routes AS R
      LEFT JOIN users AS U 
      ON provider_id = U.id
      WHERE ( beneficiary_id = ? AND status !='completed')`, [user_id]);
    };
  }
};