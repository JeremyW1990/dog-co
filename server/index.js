const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('../database/mysql.config');

const User = require('./models/user');
const Dog = require('./models/dog');

const dogRoutes = require('./routes/dog');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', dogRoutes);

User.hasMany(Dog);
Dog.belongsTo(User);


sequelize
// .sync({ force: true })
.sync()
  .then( result => {
    return User.findByPk(1)
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "Jeremy", email: 'cjwang1990@hotmail.com'})
    } 
    else {
      console.log('Find a user with ID 1')
    }
  })
  .then( result => {
    app.listen(3001, () => {
      console.log("Server is listening at prot 3001");
    })
  })
  .catch( error => {
    console.log( error );
  })


