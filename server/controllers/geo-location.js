const io = require('../socket');
const GeoLocations = require('../models/geo-location');

exports.getGeoLocations = (req, res, next) => {
    GeoLocations.fetchAll()
      .then( ([rows,fields]) => {
        res.send(rows);
      })
      .catch( err => err);
};


exports.postGeoLocation = (req, res, next) => {

  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const route_id = req.body.route_id;
  const current_walk_paired_user_id = req.body.walkee_id;
  const geo_location = new GeoLocations(null, longitude, latitude, route_id, null);

  geo_location
  .save()
  .then((result) => {
    
      const emitData = {
        latitude,
        longitude,
        current_walk_paired_user_id,
      }
      io.getIO().emit('new-geo-location', emitData);
      res.send(result);
  })
  .catch(err => err);

};






