const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')



const app = express();



app.set('views',path.join(__dirname,'views'))
app.set('view engine','jade')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'))


app.get('/',(req,res)=>{
	res.render('index')
})

app.get('/contact',(req,res)=>{
	res.render('contact')
})

app.post('/contact/send',(req,res)=>{
	const transporter =nodemailer.createTransport({
		service:'gmail',
		auth:{
			user:"business mail",
			pass:"business password"
		}
	});
	const mailOptions = {
		from:'Elbarky',
		to:'email',
		subject:'website submition',
		text:`you have submittion with the following details \n ${req.body.message}`,
		html:'<h1>works</h1>'
	}
	transporter.sendMail(mailOptions,(error,info)=>{
		if( error){
			console.log(error)
			res.redirect('/')
		}else{
			console.log('msg sent'+info.response)
			res.redirect('/')
		}
	})
})


app.listen(3000,()=>{
	console.log('server is running on 3000')
})