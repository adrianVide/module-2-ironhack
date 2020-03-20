var express = require('express');
var router = express.Router();
const Event = require('../models/event');

router.get('/', async function(req, res, next) {
  try {
  events = await Event.find({isItOver: false})
  events.sort(function (a, b) {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  })
  res.render('user/dashboard', { title: 'Palconing', events: JSON.stringify(events)}); 
  }
  catch {
    (err)=> console.error("There was an error: ",err)}  
  }  
);

router.get('/newEvent', function(req, res, next) {
  res.render('user/newEvent', { title: 'Palconing'});
});



router.post('/newEvent', function(req, res, next) {
  const {name, description, date} = req.body
  const userOrganizing = req.session.currentUser;
  
  Event.findOne({ organizer: userOrganizing._id, date: date },  (err, existingEvent) => {
    if (err) {
      next(err);
      return;
    }
    if (existingEvent !==null){

        res.render('user/newEvent', {
          errorMessage: `You already have an event scheduled at that time.`
        });
        return;
    }
    let newEvent = {
      name: name,
      description: description,
      date: date,
      organizer: userOrganizing._id,
      latitude: userOrganizing.latitude,
      longitude: userOrganizing.longitude
    }
    
    const theEvent = new Event(newEvent)

    theEvent.save((err) => {
      if (err) {
        res.render('users/newEvent', {
          errorMessage: 'Something went wrong. Try again later.'
        });
        //Adrián, si hay conflicto no te preocupes, he cambiado un return por el redirect
      }
    });
  });
  
  res.render('user/dashboard', { message: 'Your event was created successfully' });
});



module.exports = router;