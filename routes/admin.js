var express = require('express');
const session = require('express-session');
const { localsAsTemplateData } = require('hbs');
const { render, response } = require('../app');
var userHelpers=require("../helpers/user-helpers")
var router = express.Router();
let isLoggedIn;
let adminUsername = "admin";
let adminPassword = "admin"
/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log("hshi");
  console.log(req,session.isLoggedIn);
  if(req.session.isLoggedIn)
  {
    res.redirect('/admin/home')
  }
  else
  {
  res.render('admin')
}
});
router.post("/adminlogin", (req, res) => {
  
  if (req.body.username == adminUsername && req.body.password == adminPassword) {
    req.session.name=adminUsername;
    req.session.password=adminPassword;
    req.session.isLoggedIn=true;
    res.redirect("/admin/home")


  }
  else {
    res.render("admin",{message:"Please enter valid username"})
  }
})
router.get("/home", function (req, res, next) {
  userHelpers.getAllUsers().then((users)=>{
    console.log(users);
    
    res.render("adminHome",{users})
  })

});
router.get("/add-user", (req, res) => {
  res.render("addUser");
})
router.post("/add-user", (req, res) => {
  
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/admin')
})
router.get('/deleteUser/:id',(req,res)=>{
     let userId=req.params.id
     userHelpers.deleteUsers(userId).then((response)=>{
       res.redirect('/admin/home')
     })
})
module.exports = router;
