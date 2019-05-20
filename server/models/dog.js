const Sequelize = require('sequelize');

const sequelize = require('../../database/mysql.config');

const Dog = sequelize.define('dog', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  breed: Sequelize.STRING,
  age: Sequelize.INTEGER,
});

module.exports = Dog;
