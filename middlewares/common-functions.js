const express = require('express');
const router = express.Router();
const Event = require('../models/event')
const User = require('../models/user');



function readableDate(unreadableDate) {
  let dateText = JSON.stringify(unreadableDate)
  console.log(dateText)
  let day = dateText.slice(9, 11)
  let month = dateText.slice(6, 8)
  //log// console.log(month)

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
  //log// console.log(`${month} the ${day}`)
  return `${month} the ${day}`
}

function readableTime(unreadableDate) {
  let dateText = JSON.stringify(unreadableDate)
  return dateText.slice(12, 17)
}

function prepareEventOutput(events, currentUser) {
  events = populateEvents(events)
  events = sortByDate(events, currentUser)
  return events;
}

function sortByDate(eventArray, currentUser){
  eventArray.map(function (event) {
  prepareEvent(event, currentUser)
  })
  return eventArray.sort(function (a, b) {return new Date(a.date) - new Date(b.date)});
}

function prepareEvent(event, currentUser){
  event.userIsNotLoggedIn = userIsNotLoggedIn(currentUser)
  event.readableDate = readableDate(event.date)
  event.readableTime = readableTime(event.date)
  event.isOrganizer = isUserTheOrganizer(event, currentUser)
  event.isParticipant = isUserAParticipant(event, currentUser)
}

function populateEvents(events) {
  return events.map(function (event) {
    if (isEventOver(event.date) === false) {
      return event
    } else {
      closeFinishedEvent(event)
    }
  });
};

function isEventOver(eventDate) {
  let currentDate = new Date()
  //log//  //log// console.log(currentDate+" vs "+eventDate)
  if (currentDate.getTime() < eventDate.getTime()) {
    return false
  } else {
    return true
  }
}

function closeFinishedEvent(event) {
  Event.findByIdAndUpdate(
    event._id, {
      $set: {
        "isItOver": true,
      }
    }, {
      new: true
    }
  ).catch((error) => {
    //log// console.log(error)
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
    //log// console.log(error)
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
      //log// console.log(error)
    });
  })
}

async function updateUserOrganizedEventsArray(newEventId, userOrganizing) {
  //log// console.log("User ID: " + userOrganizing._id + ", event ID: " + newEventId.id)
  User.findByIdAndUpdate(
    userOrganizing._id, {
      $push: {
        "organizedEvents": newEventId.id,
      }
    }, {
      new: true
    }
  ).catch((error) => {
    //log// console.log(error)
  })
}

function userIsNotLoggedIn(user) {
  if (!user) {
    return true
  }
  return false
}


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
    //log// console.log(error)
  })
  User.findByIdAndUpdate(
    userId, {
      [pushOrPull]: {
        "participatedEvents": eventId,
      }
    }, {
      new: true
    }
  ).catch((error) => {
    //log// console.log(error)
  })
}

function isUserTheOrganizer(eventObject, user) {
  if (!user || user=== null) {
    return false
  }
  if (eventObject.organizer.equals(user._id)) {
    //log// console.log("Sí")
    return true
  };
}

function isUserAParticipant(eventObject, user) {
  if (!user || user=== null) {
    return false
  }
  if (eventObject.participants.indexOf(user._id) > -1) {
    return true
  };
}

async function populateAnnotations(foundEvent, annotations){
  foundEvent[annotations].map(async function (annotation) {
    annotation.userData = await User.findById(annotation.user)
  })
  return foundEvent
}


async function didUserReview(foundEvent, user){
  foundEvent.reviews.map(async function (review) {
    if (review.user.equals(user._id)) {
      foundEvent.userReview = review
    }
    review.userData = await User.findById(review.user)
  })
return foundEvent
}

async function scoreCalculation(foundEvent, user){
  let counter = 0
  foundEvent.reviews.map(async function (review) {
    if (review.score === 0) {
      review.negativeScore = true
    }
    counter += review.score
  })
return Math.floor((counter/foundEvent.reviews.length)*100)
}




/*
router.get('/:id', async (req, res, next) => {
  let foundEvent = await (await Event.findById(req.params.id).populate("organizer"))
  if (foundEvent === null) {
    res.redirect("/around-me")
  }
  if (foundEvent.isItOver === false) {
    foundEvent.comments.map(async function (comment) {
      comment.userData = await User.findById(comment.user)
    })
  } else {
    if (req.session.currentUser) {
      if (foundEvent.participants.indexOf(req.session.currentUser._id)>-1){
        foundEvent.userAttended = true;   
      }
      foundEvent.reviews.map(async function (review) {
          if (review.user.equals(req.session.currentUser._id)) {
            console.log("Found it!")
            foundEvent.userReview = review
          }
      review.userData = await User.findById(review.user)
    })
  }
res.render('events/event-details', foundEvent)
}})*/





module.exports = {
  readableDate,
  readableTime,
  prepareEventOutput,
  populateEvents,
  isEventOver,
  closeFinishedEvent,
  updateUserOrganizedEventsArray,
  userIsNotLoggedIn,
  eventParticipationHandler,
  isUserTheOrganizer,
  isUserAParticipant,
  sortByDate,
  populateAnnotations,
  didUserReview,
  scoreCalculation,
  prepareEvent,
};