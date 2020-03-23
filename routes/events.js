var express = require('express');
var router = express.Router();
Event = require('../models/event')
const User = require('../models/user');

router.get('/:id', async (req, res, next) => {
  let foundEvent = await Event.findById(req.params.id).catch((error) => {
    console.log(error)
  })
  foundEvent.readableDate = readableDate(foundEvent.date)
  foundEvent.time = readableTime(foundEvent.date)
  foundEvent.organizerData= await User.findById(foundEvent.organizer)
  res.render('event-details', foundEvent )
})
module.exports = router;




function readableDate(unreadableDate) {
  let dateText=JSON.stringify(unreadableDate)
  let day = dateText.slice(9, 11)
  let month = dateText.slice(6, 8)

  switch (month) {
    case "01": month = "January";
    case "02": month = "February";
    case "03": month = "March";
    case "04": month = "April";
    case "05": month = "May";
    case "06": month = "June";
    case "07": month = "July";
    case "08": month = "August";
    case "09": month = "September";
    case "10": month = "October";
    case "11": month = "November";
    case "12": month = "December";
  }

  if (dateText.charAt(9) !== 0) { day + dateText.charAt(8) };

  switch (day.charAt(1)) {
    case "1": day += "st"; break;
    case "2": day += "nd"; break;
    case "3": day += "rd"; break;
    default: day += "th";
  }

if (day.charAt(0)==="0"){day=day.slice(1)}
console.log(`${month} the ${day}`)
return `${month} the ${day}`
}

function readableTime(unreadableDate){
  let dateText=JSON.stringify(unreadableDate)
  return dateText.slice(12, 17)
}