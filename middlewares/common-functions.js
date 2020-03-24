const express = require('express');
const router = express.Router();
const Event = require('../models/event')
const User = require('../models/user');


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
  //log//  console.log(currentDate+" vs "+eventDate)
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
  
    async function updateUserOrganizedEventsArray(newEventId, userOrganizing) {
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
        console.log(error)
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
        console.log(error)
      })
    }
    
    function isUserTheOrganizer(eventObject, userId) {
      if (!userId) {
        return false
      }
      if (eventObject.organizer.equals(userId._id)) {
        console.log("Sí")
        return true
      };
    }
    
    function isUserAParticipant(eventObject, userId) {
      if (!userId) {
        return false
      }
      if (eventObject.participants.indexOf(userId._id) > -1) {
        console.log("veamos");
        return true
      };
    }

module.exports = {
  readableDate,
  readableTime,
  populateEvents,
  isEventOver,
  closeFinishedEvent,
  updateUserOrganizedEventsArray,
  userIsNotLoggedIn,
  eventParticipationHandler,
  isUserTheOrganizer,
  isUserAParticipant,
};