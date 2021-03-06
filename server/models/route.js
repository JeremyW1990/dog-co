const db = require('../../database/mysql.config');


module.exports = class Route {

  constructor(id, beneficiary_id, provider_id, status, plan_walk_at) {
    this.id = id;
    this.beneficiary_id = beneficiary_id;
    this.provider_id = provider_id;
    this.status = status;
    this.plan_walk_at = plan_walk_at;
  }

  save() {
    return db.execute(
      'INSERT INTO routes (beneficiary_id, provider_id, status, plan_walk_at) VALUES (?, ?, ?, ?)',
      [this.beneficiary_id, this.provider_id, this.status, this.plan_walk_at]
    );
  }

  static deleteById(id) {}

  static fetchAllByRequestType(user_id, requestType) {//my-walk, walk-for-me
    if (requestType === 'my-walk'){
      return db.execute(`SELECT R.id, U.id AS 'walkee_id', U.username AS 'i-walk-for', status, create_at, start_at, complete_at 
      FROM routes AS R
      LEFT JOIN users AS U 
      ON beneficiary_id = U.id
      WHERE ( provider_id = ? AND status ='paired')`, [user_id]);
    };

    if (requestType === 'walk-for-me'){
      return db.execute(`SELECT R.id, U.username AS 'my-walker', status, create_at, start_at, complete_at 
      FROM routes AS R
      LEFT JOIN users AS U 
      ON provider_id = U.id
      WHERE ( beneficiary_id = ? AND (status ='paired' OR status ='pairing'))`,[user_id]);
    };
  }

  static getAvailableParingRoutesForCurrentUser(user_id) {
    return db.execute(`SELECT R.id, U.username, status, plan_walk_at 
    FROM routes AS R
    JOIN  users AS U
    ON beneficiary_id = U.id
    WHERE (beneficiary_id != ? AND provider_id IS NULL)`, [user_id]);
  };

  static findRouteByIdAndUpdateWithStatus(route_id, provider_id, status){
    return db.execute(`UPDATE routes SET provider_id =?, status = ? WHERE id = ?`, [provider_id, status, route_id]);
  }

  static getRoutesByStatusAndUserId(user_id, status, userType){
    if (userType ==='owner') {
      return db.execute(
        `SELECT latitude, longitude, g.create_at FROM geo_locations AS g JOIN routes AS r 
        ON r.id = g.route_id
        WHERE r.beneficiary_id = ? AND r.status = ? ORDER BY g.create_at ASC`, 
        [user_id, status]);

    }

    if (userType ==='walker') {
      return db.execute(
        `SELECT r.id, r.beneficiary_id, r.provider_id, latitude, longitude, g.create_at FROM geo_locations AS g JOIN routes AS r 
        ON r.id = g.route_id
        WHERE r.provider_id = ? AND r.status = ? ORDER BY g.create_at ASC`, 
        [user_id, status]);
    }


  }
  

};