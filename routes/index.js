var express = require('express');
var router = express.Router();
const Event = require('../models/event')
const User = require('../models/user')
const prepareEventOutput = require("../middlewares/common-functions").prepareEventOutput


/* GET home page. */
router.get('/', async (req, res, next) => {  
  allEvents = await Event.find({
    isItOver: false
  }).populate('organizer', 'name')
  allEvents = prepareEventOutput(allEvents, req.session.currentUser)
  res.render('index', {
    allEvents,
    events: JSON.stringify(allEvents)
  });
});

router.get('/around-me', async function (req, res, next) {
  try {
    events = await Event.find({
      isItOver: false
    }).populate('organizer', 'name')
    events = prepareEventOutput(events, req.session.currentUser)
    res.render('around-me', {
      title: 'Palcony',
      events,
      eventsForMap: JSON.stringify(events)
    });
  } catch {
    (err) => console.error("There was an error: ", err)
  }
});



module.exports = router;