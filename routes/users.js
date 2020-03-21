var express = require('express');
var router = express.Router();
const Event = require('../models/event');
const User = require('../models/user');

router.get('/', async function (req, res, next) {
  try {
    events = await Event.find({
      isItOver: false
    })
    events.sort(function (a, b) {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    })
    res.render('users/dashboard', {
      title: 'Palcony',
      events: JSON.stringify(events)
    });
  } catch {
    (err) => console.error("There was an error: ", err)
  }
});

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
        await updateUserOrganizedEventsArray(theEvent, userOrganizing)
        res.redirect('/users/');
      };
    });
  });
});

async function updateUserOrganizedEventsArray(theEvent, userOrganizing) {
    let newEventId = await Event.findOne(theEvent, (err, eventInDb) => eventInDb)
    console.log("User ID: " + userOrganizing._id + ", event ID: " + newEventId.id)
    User.findByIdAndUpdate(
      userOrganizing._id, {
        $push: {
          "organizedEvents": newEventId.id,
        }
      }, {
        new: true
      }
    ).then((result) => {
      console.log(result)
    }).catch((error) => {
        console.log(error)
      })
    }

    module.exports = router;