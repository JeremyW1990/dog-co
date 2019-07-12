const db = require('../../database/mysql.config');

module.exports = class GeoLocation {
  constructor(id, longitude, latitude, route_id, create_at) {
    this.id = id;
    this.longitude = longitude;
    this.latitude = latitude;
    this.route_id = route_id;
    this.create_at = create_at;

  }

  save() {

    return db.execute(
      'INSERT INTO `geo_locations` (longitude, latitude, route_id) VALUES (?, ?, ?)',
      [this.longitude, this.latitude, this.route_id]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM `geo_locations` WHERE `route_id` = 3');
  
  }

};

// DELETE FROM `geo_locations` WHERE `route_id` = 2 