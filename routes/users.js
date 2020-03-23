var express = require('express');
var router = express.Router();
const Event = require('../models/event');
const User = require('../models/user');

router.get('/', async function (req, res, next) {
  try {
    events = await Event.find({
      isItOver: false
    })
    events = populateEvents(events)
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
  if (isEventOver(req.body.date)===true) {

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
  ).catch((error) => {
    console.log(error)
  })
}

function populateEvents(events) {
  return events.map(function (event) {
      if (isEventOver(event.date.getTime()) === false) {
        return event
      } else {
        closeFinishedEvent(event)
      }
    });
  };

function isEventOver(eventDate) {
  let currentDate = new Date()
  if (currentDate.getTime() < eventDate) {
    return false
  } else {
    return true
  }
}

function closeFinishedEvent(event) {
  console.log("¡Funciono!")
  Event.findByIdAndUpdate(
    event._id, {
      $set: {
        "isItOver": true,
      }
    }, {
      new: true
    }
  ).catch((error) => {
    console.log(error)
  })
  User.findByIdAndUpdate(
    event.organizer, {
      $pull: {
        "organizedEvents": event.id,
      },
      $push: {
        "pastOrganizedEvents": event.id,
      },
    }, {
      new: true
    }).catch((error) => {
    console.log(error)
  });
  event.participants.map(function (participant) {
    User.findByIdAndUpdate(
      participant, {
        $pull: {
          "participatedEvents": event.id,
        },
        $push: {
          "pastParticipatedEvents": event.id,
          },
        }, {
          new: true
        }).catch((error) => {
        console.log(error)
      });
    })
  }






  module.exports = router;