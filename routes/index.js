var express = require('express');
var router = express.Router();
const Event = require('../models/event')
const User = require('../models/user')


/* GET home page. */
router.get('/', async (req, res, next) => {
  let eventItems = await Event.find().catch((error) => {
    console.log(error)
  })
  // everyEvent.organizerName = await User.findById(everyEvent.organizer)
  eventItems.map(everyEvent => return everyEvent.organizerName = User.findById(everyEvent.organizer));
  // console.log(eventItems.organizerName[0]);

  res.render('index', eventItems);
});

module.exports = router;