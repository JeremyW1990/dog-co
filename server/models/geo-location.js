const db = require('../../database/mysql.config');

module.exports = class Product {
  constructor(id, longitude, latitude, route_id, create_at) {
    this.id = id;
    this.longitude = longitude;
    this.latitude = latitude;
    this.route_id = route_id;
    this.create_at = create_at;
  }

  save() {
    return db.execute(
      'INSERT INTO `geo_locations` (longitude, price, latitude, route_id, create_at) VALUES (?, ?, ?, ?)',
      [this.longitude, this.price, this.latitude, this.route_id, this.create_at]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM `geo_locations`');
  }

  static findById(id) {
    return db.execute('SELECT * FROM geo-locations WHERE geo_locations.id = ?', [id]);
  }
};