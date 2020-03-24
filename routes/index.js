var express = require('express');
var router = express.Router();
const Event = require('../models/event')
const User = require('../models/user')
const readableDate = require("../middlewares/common-functions").readableDate
const readableTime = require("../middlewares/common-functions").readableTime
const populateEvents = require("../middlewares/common-functions").populateEvents
const isEventOver = require("../middlewares/common-functions").isEventOver
const closeFinishedEvent = require("../middlewares/common-functions").closeFinishedEvent

/* GET home page. */
router.get('/', async (req, res, next) => {
  let eventItems = await Event.find()
  .populate('organizer', 'name')
  eventItems.map(function(event){
    event.readableDate = readableDate(event.date)
    event.readableTime = readableTime(event.date)})

    allEvents = await Event.find({
      isItOver: false
    })
    allEvents = populateEvents(allEvents)
    allEvents.sort(function (a, b) {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    })
  res.render('index', {eventItems, events: JSON.stringify(allEvents)});
  });
  



 
module.exports = router;