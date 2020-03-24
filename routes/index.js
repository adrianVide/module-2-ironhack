var express = require('express');
var router = express.Router();
const Event = require('../models/event')
const User = require('../models/user')
const readableDate = require("../middlewares/common-functions").readableDate
const readableTime = require("../middlewares/common-functions").readableTime
const populateEvents = require("../middlewares/common-functions").populateEvents
const isEventOver = require("../middlewares/common-functions").isEventOver
const closeFinishedEvent = require("../middlewares/common-functions").closeFinishedEvent
const prepareEventOutput = require("../middlewares/common-functions").prepareEventOutput

/* GET home page. */
router.get('/', async (req, res, next) => {
  let eventItems = await Event.find()
    .populate('organizer', 'name')
  eventItems.map(function (event) {
    event.readableDate = readableDate(event.date)
    event.readableTime = readableTime(event.date)
  })
  allEvents = await Event.find({
    isItOver: false
  })
  allEvents = prepareEventOutput(allEvents);
  res.render('index', {
    eventItems,
    events: JSON.stringify(allEvents)
  });
});

router.get('/around-me', async function (req, res, next) {
  try {
    events = await Event.find({
      isItOver: false
    })
    events = prepareEventOutput(events);
    res.render('around-me', {
      title: 'Palcony',
      events: JSON.stringify(events)
    });
  } catch {
    (err) => console.error("There was an error: ", err)
  }
});



module.exports = router;