var express = require('express');
const { localsAsTemplateData } = require('hbs');
const { render } = require('../app');
var router = express.Router();

let adminUsername = "admin";
let adminPassword = "admin"
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('admin')
});
router.post("/adminlogin", (req, res) => {
  
  if (req.body.username == adminUsername && req.body.password == adminPassword) {
    
    res.redirect("/admin/home")

  }
  else {
    res.render("admin",{message:"Please enter valid username"})
  }
})
router.get("/home", function (req, res, next) {

  res.render("adminHome")
});
router.get("/add-user", (req, res) => {
  res.render("addUser");
})
router.post("/add-user", (req, res) => {
  console.log(req.body);
})
module.exports = router;
