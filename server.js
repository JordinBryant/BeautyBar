const mongoose = require('mongoose');
require('dotenv').config();
const express= require('express');
const app = express();
const Service = require("./models/beauty.js");

const methodOverride = require('method-override');


mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.post('/Home', (req, res) => {
    Service.create(req.body,(error, createdService)=>{
        res.redirect("/Home")
    })
	
});

//I
app.get('/Home', (req, res) => {
   Service.find({},(error, allServices)=> {
    res.render("index.ejs", {
        services: allServices,
    })
   })
});

//N
app.get("/Home/new", (req, res)=>{
    res.render("new.ejs",{
        // services: allServices,
    })
});  
//D
app.get("/Home/:id" , (req, res)=>{
    res.render("show_views.ejs" , {
      services: services[req.params.id],
})
});

//U
//C
//E
//S


app.listen(3000, () => {
    console.log('listening....');
});