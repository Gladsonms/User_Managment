const { response } = require('express');
var express = require('express');
var router = express.Router();
const session=require('express-session')
var userHelpers=require("../helpers/user-helpers")

let products=[
  {
    name:"i Phone",
    category:"Mobile",
    descreption : "This is descreption",
    image:"data:image/png;base64,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"
  },
  {
    name:"Redmi note 8",
    category:"Mobile",
    descreption : "This is descreption",
    image:"data:image/png;base64,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"
  },
  {
    name:"Oppo f 7",
    category:"Mobile",
    descreption : "This is descreption",
    image:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQYDmNX0PEWT9RVDn8f-Us5wjCzf3tDFlWoiS0oyw4K5rXQV3aMND8LbSq5AEex&usqp=CAc"
  },
  {
    name:"Samsung note 20 ",     
    category:"Mobile",
    descreption : "This is descreption",
    image:"data:image/png;base64,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"
  },
]

/* GET home page. */
router.get('/', function(req, res, next) {
  let user= req.session.user

  res.render('index', { products,user});
});
router.get('/login',(req,res)=>{

  res.render('userLogin',{"LoginErr":req.session.loginErr})
  req.session.loginErr=false
})
router.get('/signup',(req,res)=>{
  res.render('userSignup')
})
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
         console.log(response);
         
        })
        res.redirect('/login')
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true;
         req.session.user=response.user
      res.redirect('/')
    }
    else {
      req.session.loginErr=true;
      res.redirect('/login')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
module.exports = router;
