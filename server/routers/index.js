//router setup
const express = require('express')
const router = new express.Router()

//authentication setup
const passport = require("passport");

//index route
router.get('', (req, res) => {
  res.render('index')
})

//google auth entry route
router.get('/login',(req,res)=>{
res.redirect('/auth/google')
})

//route authenticating user by google
router.get('/auth/google',
  passport.authenticate('google',{scope: ["profile"]})
)

//route redirected to after sucessfull authentication from google
router.get('/auth/google/home',passport.authenticate('google', { failureRedirect: "/login" }),
function(req, res) {
  res.redirect("/result");
});

// redirected route to render result page
router.get('/result',(req,res)=>{
  if (req.isAuthenticated()){
    res.render('index')
    }else{
      res.redirect('/login')
    }
  
  
})

//exporting module for app.js
module.exports = router
