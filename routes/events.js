const express = require('express');
const router = express.Router();
const Event = require('../models/event')
const User = require('../models/user');
const readableDate = require("../middlewares/common-functions").readableDate
const readableTime = require("../middlewares/common-functions").readableTime
const userIsNotLoggedIn = require("../middlewares/common-functions").userIsNotLoggedIn
const eventParticipationHandler = require("../middlewares/common-functions").eventParticipationHandler
const isUserTheOrganizer = require("../middlewares/common-functions").isUserTheOrganizer
const isUserAParticipant = require("../middlewares/common-functions").isUserAParticipant

router.get('/:id', async (req, res, next) => {
  let foundEvent = await (await Event.findById(req.params.id).populate("organizer"))
  if (foundEvent === null) {
    res.redirect("/around-me")
  }
  if (foundEvent.isItOver === false){
  foundEvent.comments.map(async function (comment) {
    comment.userData = await User.findById(comment.user)
  })
  } else {
    foundEvent.reviews.map(async function (review) {
      console.log(review.user +"    vs    "+req.session.currentUser._id)
      if (review.user.equals(req.session.currentUser._id)){
        console.log("Found it!")
        foundEvent.userReview=review
      }
      review.userData = await User.findById(review.user)
    })
  }

  console.log(foundEvent.userReview)
  foundEvent.readableDate = readableDate(foundEvent.date)
  foundEvent.time = readableTime(foundEvent.date)
  foundEvent.userIsNotLoggedIn = userIsNotLoggedIn(req.session.currentUser)
  foundEvent.isOrganizer = isUserTheOrganizer(foundEvent, req.session.currentUser)
  foundEvent.isParticipant = isUserAParticipant(foundEvent, req.session.currentUser)
  //foundEvent.organizerData = await User.findById(foundEvent.organizer)
  res.render('events/event-details', foundEvent)
})

router.get('/participate/:id', async (req, res, next) => {
  eventParticipationHandler(req.params.id, "$push", req.session.currentUser._id);
  res.redirect('back')
})

router.get('/abandon/:id', async (req, res, next) => {
  eventParticipationHandler(req.params.id, "$pull", req.session.currentUser._id);
  res.redirect('back')
})

router.get('/edit-event/:id', async (req, res, next) => {
  let foundEvent = await Event.findById(req.params.id).populate("User").catch((error) => {
    console.error(error)
  })
  const userCheck = await isUserTheOrganizer(foundEvent, req.session.currentUser._id)
  if (userCheck === false) {
    return res.redirect(`/events/${req.params.id}`);
  }
  foundEvent.time = JSON.stringify(foundEvent.date).slice(1, 24)
  res.render('events/edit-event', foundEvent)
})

router.post('/edit-event/:id', async (req, res, next) => {
  let foundEvent = await Event.findById(req.params.id).populate("User").catch((error) => {
    console.error(error)
  })
  const userCheck = await isUserTheOrganizer(foundEvent, req.session.currentUser._id)
  if (userCheck === false) {
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
  if (userCheck === false) {
    return res.redirect(`/events/${req.params.id}`);
  }
  await Event.findByIdAndDelete(req.params.id);
  console.log("deleted")
  res.redirect(`/around-me`)
});


router.post('/:id/add-comment', (req, res, next) => {
  const user = req.session.currentUser._id
  const {
    comments
  } = req.body;
  Event.findByIdAndUpdate(
      req.params.id, {
        $push: {
          comments: {
            $each: [{
              user,
              comments
            }],
            $position: 0
          }
        }
      })
    .then(() => {
      res.redirect("back");
    })
    .catch(error => {
      console.log(error);
    });
});

router.post('/:id/add-review', (req, res, next) => {
  const user = req.session.currentUser._id
  const {
    score,
    comments
  } = req.body;
  Event.findByIdAndUpdate(
      req.params.id, {
        $push: {
          reviews: {
            $each: [{
              user,
              score,
              comments
            }],
            $position: 0
          }
        }
      })
    .then(() => {
      res.redirect("back");
    })
    .catch(error => {
      console.log(error);
    });
});



module.exports = router;