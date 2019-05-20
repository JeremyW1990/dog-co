const express = require('express');

const dogController = require('../controllers/dog');

const router = express.Router();

router.get('/dogs', dogController.getDogs);

module.exports = router;