const express = require('express');

const geoLocationController = require('../controllers/geo-location');

const router = express.Router();

router.get('/geo-locations', geoLocationController.getGeoLocations);

module.exports = router;
