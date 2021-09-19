var express = require('express');
const { render } = require('../app');
var router = express.Router();

let adminUsername="admin";
let adminPassword="admin"
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin')
});
router.post("/adminlogin",(req,res)=>{
  console.log("az");
console.log(req.body.username)
})
router.get("/home",function(req,res,next){

res.render("adminHome")
});
router.get("/add-user",(req,res)=>{
   res.render("addUser");
})
router.post("/add-user",(req,res)=>{
  console.log(req.body);
})
module.exports = router;
