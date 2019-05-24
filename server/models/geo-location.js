const Sequelize = require('Sequelize');

const sequelize = require('../../database/mysql.config');

const User = sequelize.define('geo-location', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  longitude: Sequelize.INTEGER,
  latitude: Sequelize.INTEGER,
  create_at: Sequelize.DATE,
  route_id : {
    type: Sequelize.INTEGER,
    references: 'users', // <<< Note, its table's name, not object name
    referencesKey: 'id' // <<< Note, its a column name    
  }
});

module.exports = User;
