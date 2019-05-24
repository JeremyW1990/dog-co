const express = require('express');
const bodyParser = require('body-parser');

const db = require('../database/mysql.config');

const routeRoutes = require('./routes/route');
const geoLocationRoutes = require('./routes/geo-location');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log('Universal Middleware test.');
  next();
});


app.use('/api', routeRoutes);
app.use('/api', geoLocationRoutes);


app.listen(3001, () => {
  console.log("Server is listening at prot 3001");
});

