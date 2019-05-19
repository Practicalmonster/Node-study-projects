const express = require('express')
const morgan = require("morgan")
const helmet  = require("helmet")
const cors = require('cors')
const userAuth = require('./routes/userAuth')
const fs = require("fs");
var fuzzy = require('fuzzy');



const text = fs.readFileSync("./Prices.csv").toString().split("\n");

const PORT = 3002;
const SECRET = "shh"
const app = express();



app.use(morgan('combined'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(userAuth)


app.get('/search',(req,res)=>{
    var results = fuzzy.filter(req.query["name"], text)
    var matches = results.map(function(el) { return el.string; });
    res.send(matches.join("$"));
})



app.use('/',(req,res,next)=>{
    const token = req.cookies.access_token
    const decoded = JWT.verify(token,SECRET)
    res.status(200).json({mission:"success"})
})

app.listen(PORT, ()=>{
    console.log(`the app is listening on port ${PORT}`)
})
