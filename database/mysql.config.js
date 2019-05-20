const Sequelize = require('sequelize');

const sequelize = new Sequelize('dog-co', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  define: {
    timestamps: false
  },
});

module.exports = sequelize;
