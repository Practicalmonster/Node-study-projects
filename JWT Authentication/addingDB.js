const mongoose = require('mongoose')
var fs = require("fs");

mongoose.connect("mongodb+srv://PracticalDemon:LE82IZZqGTESI4UG@fetareey-gp9mf.mongodb.net/Pharma?retryWrites=true",{useNewUrlParser: true}).catch((e)=>console.log(e))

mongoose.set('useCreateIndex', true);

const DataSchema=new mongoose.Schema({Name:{type:String,require:true}})
const DataM = mongoose.model('Medics',DataSchema)
var text = fs.readFileSync("./Prices.csv").toString().split("\n");
text.map(Name=>{
    const doc = new DataM({Name})
    doc.save((e)=>e? console.log(e): console.log("success"))
})