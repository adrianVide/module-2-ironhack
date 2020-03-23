var express = require('express');
var router = express.Router();
const Event = require('../models/event')
const User = require('../models/user')


/* GET home page. */
router.get('/', async (req, res, next) => {
  let eventItems = await Event.find().catch((error) => {
    console.log(error)
  })
  eventItems.organizerName = await User.findById(eventItems.organizer)
  console.log(eventItems);

  res.render('index', eventItems);
});

module.exports = router;
