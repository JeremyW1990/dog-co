const express = require('express');

const routeController = require('../controllers/route');

const router = express.Router();

router.get('/routes/:user_id', routeController.getRoutes);

module.exports = router;
