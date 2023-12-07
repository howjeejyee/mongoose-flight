const express = require('express');
const router = express.Router();
const flightsController = require('../controllers/flights');

router.get('/', flightsController.index);

router.get('/new', flightsController.new);

router.post('/', flightsController.create);

router.get('/:id', flightsController.show);

router.post('/:id/destinations', flightsController.createDestination);

module.exports = router;
