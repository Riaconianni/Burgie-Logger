// import express.Router()
const router = require('express').Router();

// import functionality to get all cats
const { getBurgers } = require('../../controllers/burger_controller');

// set up root '/' GET route to serve home page with cat data
router.get('/', (req, res) => {
  // get all cat data
  getBurgers()
    .then(burgerdata => {
      res.render('index', { cats: burgerdata });
    })
    .catch(err => {
      res.status(500).end();
    });
});

module.exports = router;
