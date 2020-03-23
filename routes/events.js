const express = require('express');
const router = express.Router();
const Event = require('../models/event')
const User = require('../models/user');

router.get('/:id', async (req, res, next) => {
  let foundEvent = await Event.findById(req.params.id).populate("organizer").catch((error) => {
    console.error(error)
  })
  if (foundEvent === null) {
    res.redirect("/users/")
  }
  foundEvent.readableDate = readableDate(foundEvent.date)
  foundEvent.time = readableTime(foundEvent.date)
  foundEvent.isOrganizer = isUserTheOrganizer(foundEvent, req.session.currentUser)
  foundEvent.isParticipant = isUserAParticipant(foundEvent, req.session.currentUser)
  //foundEvent.organizerData = await User.findById(foundEvent.organizer)
  res.render('events/event-details', foundEvent)
})

router.get('/participate/:id', async (req, res, next) => {
  eventParticipationHandler(req.params.id, "$push", req.session.currentUser._id);
  res.redirect(`/events/${req.params.id}`)
})

router.get('/abandon/:id', async (req, res, next) => {
  eventParticipationHandler(req.params.id, "$pull", req.session.currentUser._id);
  res.redirect(`/events/${req.params.id}`)
})

router.get('/edit-event/:id', async (req, res, next) => {
  console.log("Empieza el edit")
  let foundEvent = await Event.findById(req.params.id).populate("User").catch((error) => {
    console.error(error)
  })
  const userCheck = await isUserTheOrganizer(foundEvent, req.session.currentUser._id)
  if (userCheck===false) {
    console.log("Not him")
    return res.redirect(`/events/${req.params.id}`);
  }
  console.log("Usuario validado")
  foundEvent.time = JSON.stringify(foundEvent.date).slice(1, 24)
  res.render('events/edit-event', foundEvent)
})

router.post('/edit-event/:id', async (req, res, next) => {
  let foundEvent = await Event.findById(req.params.id).populate("User").catch((error) => {
    console.error(error)
  })
  const userCheck = await isUserTheOrganizer(foundEvent, req.session.currentUser._id)
  if (userCheck===false) {
    console.log("Not him")
    return res.redirect(`/events/${req.params.id}`);
  }
  const {
    name,
    description,
    date
  } = req.body
  await Event.findByIdAndUpdate(req.params.id, {
    name,
    description,
    date
  }).catch((error) => {
    console.log(error)
  })
  res.redirect(`/events/${req.params.id}`)
})

router.get('/delete/:id', async (req, res, next) => {
  let foundEvent = await Event.findById(req.params.id).populate("User").catch((error) => {
    console.error(error)
  })
  const userCheck = await isUserTheOrganizer(foundEvent, req.session.currentUser._id)
  if (userCheck===false) {
    return res.redirect(`/events/${req.params.id}`);
  }
  await Event.findByIdAndDelete(req.params.id);
  console.log("deleted")
  res.redirect(`/users/`)
});


//////////// Funciones /////////////

function eventParticipationHandler(eventId, pushOrPull, userId) {
  Event.findByIdAndUpdate(
    eventId, {
      [pushOrPull]: {
        "participants": userId,
      }
    }, {
      new: true
    }
  ).catch((error) => {
    console.log(error)
  })
}

function isUserTheOrganizer(eventObject, userId) {
      if (eventObject.organizer.equals(userId._id)) {
        console.log("Sí")
        return true
      };
    }

function isUserAParticipant(eventObject, userId){
      if (eventObject.participants.indexOf(userId._id) > -1){
        console.log("veamos");
        return true};
}

async function isTheUserTheOrganizer(eventId, user) {
  userVerification = await Event.findById(eventId)
  //log//  console.log(userVerification.organizer)
  if (userVerification.organizer.equals(user)) {
    console.log("The user IS the organizer")
    return true
  }
  console.log("The user is NOT the organizer - REDIRECTING")
  return false
}

module.exports = router;

function readableDate(unreadableDate) {
  let dateText = JSON.stringify(unreadableDate)
  let day = dateText.slice(9, 11)
  let month = dateText.slice(6, 8)
  console.log(month)

  switch (month) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
    default:
      month = "Somewhere in time, on "
      break;
  }

  if (dateText.charAt(9) !== 0) {
    day + dateText.charAt(8)
  };

  switch (day.charAt(1)) {
    case "1":
      day += "st";
      break;
    case "2":
      day += "nd";
      break;
    case "3":
      day += "rd";
      break;
    default:
      day += "th";
  }

  if (day.charAt(0) === "0") {
    day = day.slice(1)
  }
  console.log(`${month} the ${day}`)
  return `${month} the ${day}`
}

function readableTime(unreadableDate) {
  let dateText = JSON.stringify(unreadableDate)
  return dateText.slice(12, 17)
}