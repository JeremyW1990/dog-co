const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('../database/mysql.config');
const dogRoutes = require('./routes/dog');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', dogRoutes);

sequelize.sync()
  .then( result => {

    app.listen(3001, () => {
      console.log("Server is listening at prot 3001");
    })
  })
  .catch( error => {
    console.log( error );
  })



