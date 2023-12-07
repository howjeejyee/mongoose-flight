const Flight = require('../models/flight');

module.exports = {
  index: async (req, res) => {
    try {
      const flights = await Flight.find();
      res.render('flights/index', { flights });
    } catch (error) {
      console.error('Error fetching flights:', error.message);
      res.status(500).send('Internal Server Error');
    }
  },

  new: (req, res) => {
    res.render('flights/new');
  },
  
  create: async (req, res) => {
    const { airline, airport, flightNo, departs } = req.body;
    try {
      const newFlight = new Flight({ airline, airport, flightNo, departs });
      await newFlight.save();
      res.redirect('/flights');
    } catch (error) {
      console.error('Error creating flight:', error.message);
      res.status(500).send('Internal Server Error');
    }
  },
  show: async (req, res) => {
    try {
      const flight = await Flight.findById(req.params.id);
      res.render('flights/show', { flight });
    } catch (error) {
      console.error('Error fetching flight details:', error.message);
      res.status(500).send('Internal Server Error');
    }
  },

  createDestination: async (req, res) => {
    const { airport, arrival } = req.body;
    try {
      const flight = await Flight.findById(req.params.id);
      flight.destinations.push({ airport, arrival });
      await flight.save();
      res.redirect(`/flights/${req.params.id}`);
    } catch (error) {
      console.error('Error adding destination:', error.message);
      res.status(500).send('Internal Server Error');
    }
  },
};
