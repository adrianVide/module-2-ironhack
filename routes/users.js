var express = require('express');
var router = express.Router();
const Event = require('../models/event');
const User = require('../models/user');
const readableDate = require("../middlewares/common-functions").readableDate
const readableTime = require("../middlewares/common-functions").readableTime
const populateEvents = require("../middlewares/common-functions").populateEvents
const isEventOver = require("../middlewares/common-functions").isEventOver
const closeFinishedEvent = require("../middlewares/common-functions").closeFinishedEvent
const updateUserOrganizedEventsArray = require("../middlewares/common-functions").updateUserOrganizedEventsArray

router.get("/dashboard", async function (req,res,next){
  const userOrganizing = req.session.currentUser;
  const userData = await User.findById(userOrganizing._id).populate("organizedEvents").populate("participatedEvents")
  userData.organizedEvents.map(function(event){
    event.readableDate = readableDate(event.date)
    event.readableTime = readableTime(event.date)
  })
  userData.participatedEvents.map(function(event){
    event.readableDate = readableDate(event.date)
    event.readableTime = readableTime(event.date)
  })
  res.render("users/dashboard", {userData})
})

router.get('/add-event', function (req, res, next) {
  res.render('users/add-event', {
    title: 'Palcony'
  });
});

router.post('/add-event', async function (req, res, next) {
  const {
    name,
    description,
    date
  } = req.body
  const userOrganizing = req.session.currentUser;
  const checkDate = new Date(date)
  if (isEventOver(checkDate)===true) {

    res.render('users/add-event', {
      errorMessage: `Events can't happen in the past; please input a future date.`
    });
    return;
  }
  let newEvent
  Event.findOne({
    organizer: userOrganizing._id,
    date: date
  }, (err, existingEvent) => {
    if (err) {
      next(err);
      return;
    }
    if (existingEvent !== null) {

      res.render('users/add-event', {
        errorMessage: `You already have an event scheduled at that time.`
      });
      return;
    }
    newEvent = {
      name: name,
      description: description,
      date: date,
      organizer: userOrganizing._id,
      latitude: userOrganizing.latitude,
      longitude: userOrganizing.longitude
    }
    const theEvent = new Event(newEvent)
    console.log(theEvent)

    theEvent.save(async (err) => {
      if (err) {
        res.render('users/add-event', {
          errorMessage: 'Something went wrong. Try again later.'
        });
        //Adrián, si hay conflicto no te preocupes, he cambiado un return por el redirect
      } else {
        let newEventId = await Event.findOne(theEvent, (_err, eventInDb) => eventInDb)
        await updateUserOrganizedEventsArray(newEventId, userOrganizing)
        res.redirect(`/events/${newEventId.id}`);
      };
    });
  });
});


  module.exports = router;