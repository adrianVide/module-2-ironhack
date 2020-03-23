var express = require('express');
var router = express.Router();
const Event = require('../models/event')
const User = require('../models/user')


/* GET home page. */
router.get('/', async (req, res, next) => {
  let eventItems = await Event.find().limit(5)
  .populate('organizer', 'name')

  // eventItems.readableDate = readableDate(eventItems.date)

  // function readableDate(unreadableDate) {
  //   let dateText = JSON.stringify(unreadableDate)
  //   let day = dateText.slice(9, 11)
  //   let month = dateText.slice(6, 8)
  //   console.log(month)
  
  //   switch (month) {
  //     case "01":
  //       month = "January";
  //       break;
  //     case "02":
  //       month = "February";
  //       break;
  //     case "03":
  //       month = "March";
  //       break;
  //     case "04":
  //       month = "April";
  //       break;
  //     case "05":
  //       month = "May";
  //       break;
  //     case "06":
  //       month = "June";
  //       break;
  //     case "07":
  //       month = "July";
  //       break;
  //     case "08":
  //       month = "August";
  //       break;
  //     case "09":
  //       month = "September";
  //       break;
  //     case "10":
  //       month = "October";
  //       break;
  //     case "11":
  //       month = "November";
  //       break;
  //     case "12":
  //       month = "December";
  //       break;
  //     default:
  //       month = "Somewhere in time, on "
  //       break;
  //   }
  
  //   if (dateText.charAt(9) !== 0) {
  //     day + dateText.charAt(8)
  //   };
  
  //   switch (day.charAt(1)) {
  //     case "1":
  //       day += "st";
  //       break;
  //     case "2":
  //       day += "nd";
  //       break;
  //     case "3":
  //       day += "rd";
  //       break;
  //     default:
  //       day += "th";
  //   }
  
  //   if (day.charAt(0) === "0") {
  //     day = day.slice(1)
  //   }
  //   console.log(`${month} the ${day}`)
  //   return `${month} the ${day}`
  // }

  // everyEvent.organizerName = await User.findById(everyEvent.organizer)
  // eventItems.map(everyEvent => return everyEvent.organizerName = User.findById(everyEvent.organizer));
  // console.log(eventItems.organizerName[0]);
  // eventItems.forEach(async (element) => { element.organizerName = await User.findById(element.organizer);
  

    console.log(eventItems);

  // });
  // console.log(eventItems);
  res.render('index', {eventItems});
});

module.exports = router;