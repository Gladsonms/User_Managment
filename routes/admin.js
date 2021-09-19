var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin')
});
router.get("/home",function(req,res,next){

res.render("adminHome")
});
module.exports = router;
