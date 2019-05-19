const router = require('express').Router();
const JWT = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const userSchema = require('../schemas/userSchema')
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://PracticalDemon:LE82IZZqGTESI4UG@fetareey-gp9mf.mongodb.net/Pharma?retryWrites=true",{useNewUrlParser: true}).catch((e)=>console.log(e))
mongoose.set('useCreateIndex', true);

const userModel = mongoose.model('user', userSchema)

const secret = "sshh"


router.post('/register',(req,res)=>{
    const { email , phone , password, username,pharmaName} = req.body
    if(email && phone && password && username && pharmaName){
        const user = new userModel({ email , phone , password, username,pharmaName})
        user.save((e)=>
            {if(e){
                console.log(e)
            }else{
                const payload = {
                    username :username,
                    auth: 0
                }
                const token = JWT.sign(payload,secret)
                res.cookie('access_token',token,{
                    httpOnly:true,
                    maxAge:3600,
                    // secure:true
                })
                res.status(201).send()
            }}
        )



    }else{
        res.status(500).send()
    }
})



router.post('/auth/login',(req,res)=>{
    const {username,password} = req.body;
    userModel.findOne({username},(err,user)=>{
        if (err) {
            console.error(err);
            res.status(500)
              .json({
              error: 'Internal system error'
            });
          } else if (!user) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
              });
          } else {
              if( password !== user.password){
                  res.status(500).send();
              }else{
                  res.status(200)
                  const payload = {
                    username :username,
                    auth: user.auth
                }
                const token = JWT.sign(payload,secret)
                res.cookie('access_token',token,{
                    httpOnly:true,
                    maxAge:3600,
                    // secure:true
                })
                res.status(201).send("correct")
              }

          }
    })
})


module.exports=router;