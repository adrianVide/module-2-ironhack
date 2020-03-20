const express = require("express");
const router = express.Router();

const bcryptSalt = 10;
const bcrypt = require('bcryptjs');

const User = require('../models/user');



router.get("/signup", (req,res,next) =>{
    res.render("auth/signup", {
        errorMessage:""
    });
});

router.post('/signup', (req, res, next) => {
    const nameInput = req.body.name;
    const emailInput = req.body.email;
    const passwordInput = req.body.password;
    const {passwordRepeat, latitude, longitude} = req.body;
  
    if (emailInput === '' || passwordInput === '') {
      res.render('auth/signup', {
        errorMessage: 'Enter both a valid email email and password to sign up.'
      });
      return;
    }
    if (passwordInput !== passwordRepeat) {
        res.render('auth/signup', {
          errorMessage: 'Please enter the same password in both fields.'
        });
        return;
      }
  
    User.findOne({ email: emailInput }, '_id', (err, existingUser) => {
      if (err) {
        next(err);
        return;
      }
  
      if (existingUser !== null) {
        res.render('auth/signup', {
          errorMessage: `The email ${emailInput} is already registered in Palconing.`
        });
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashedPass = bcrypt.hashSync(passwordInput, salt);
  
      const registerForm = {
        name: nameInput,
        email: emailInput,
        password: hashedPass,
        latitude: latitude,
        longitude: longitude,
      };
  
      const theUser = new User(registerForm);
  
      theUser.save((err) => {
        if (err) {
          res.render('auth/signup', {
            errorMessage: 'Something went wrong. Try again later.'
          });
          return;
        }
          res.redirect('/');
      });
    });
  });



module.exports = router;