var express = require('express');
var router = express.Router();
Event = require('../models/event')
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:id', async (req, res, next) => {
  let foundEvent = await Event.findById(req.params.id)
  res.render('event-details', foundEvent ) 
})

module.exports = router;



