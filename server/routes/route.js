const express = require('express');

const routeController = require('../controllers/route');

const router = express.Router();

router.get('/routes', routeController.getRoutes);

module.exports = router;
