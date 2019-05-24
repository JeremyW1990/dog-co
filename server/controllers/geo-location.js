const getGeoLocations = require('../models/geo-location');

exports.getGeoLocations = (req, res, next) => {
    console.log("Hit getGeoLocations");
    getGeoLocations.fetchAll()
      .then( ([rows,fields]) => {
        res.send(rows);
      })
      .catch( err => {
          console.log(err);
      });
};


