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

router.get("/login", (req,res,next) =>{
  res.render("auth/login", {
      errorMessage:""
  });
});

router.post('/signup', (req, res, next) => {
    const nameInput = req.body.name;
    const emailInput = req.body.email;
    const passwordInput = req.body.password;
    const {passwordRepeat, description, latitude, longitude} = req.body;
  
    if (nameInput === '' || emailInput === '' || passwordInput === '') {
      res.render('auth/signup', {
        errorMessage: 'Enter valid user details.'
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
          errorMessage: `The email ${emailInput} is already registered in Palcony.`
        });
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashedPass = bcrypt.hashSync(passwordInput, salt);
  
      const registerForm = {
        name: nameInput,
        email: emailInput,
        password: hashedPass,
        description: description,
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
          res.redirect('/auth/login');
      });
    });
  });


  router.post("/login", (req, res, next) => {
    const inputEmail = req.body.email
    const inputPassword = req.body.password
    if (inputEmail === "" || inputPassword === "") {
      res.render("auth/signup", {
        errorMessage: "Please include valid credentials"
      });
      return
    }
    User.findOne({
        email: inputEmail
      })
      .then(user => {
        if (user === null) {
          res.render("auth/signup", {
            errorMessage: "No such user exists, please sign up"
          });
          return
  
        } else {
          if (bcrypt.compareSync(inputPassword, user.password)) {
            req.session.currentUser = user;
            res.redirect('/around-me');
            }
           else {
            res.render("auth/login", {
              errorMessage: "Incorrect password"
            })
          }
        }
      })
      .catch(error => next(error));
  })
  
  router.get("/logout", (req, res, next)=>{
  req.session.destroy(err => res.redirect("/"))
  })
  

module.exports = router;