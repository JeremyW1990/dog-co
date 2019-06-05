const express = require('express');

const routeController = require('../controllers/route');

const router = express.Router();

router.get('/routes/:user_id', routeController.getRoutes);
router.post('/routes/:user_id', routeController.createRoute);

router.get('/available-pairing-route-for-user/:user_id', routeController.getAvailableParingRoutesForCurrentUser);

module.exports = router;