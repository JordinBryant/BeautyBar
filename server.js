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



//I
app.get('/Home', (req, res) => {
   Service.find({},(error, allServices)=> {
    res.render("index.ejs", {
        services: allServices,
    })
   })
});

app.get('/Home/badges', (req, res)=> {
    res.render("contact.ejs");
});

//N
app.get("/Home/new", (req, res)=>{
    Service.find({}, (error, allServices)=> {
    res.render("new.ejs",{
     services: allServices,
    })
    })
});
 
//D
app.delete("/Home/:id", (req, res) => {
   Service.findByIdAndDelete(req.params.id, (err,data) => {
    res.redirect("/Home");
        });
    });


//U
app.put("/Home/:id", (req, res) => {
    Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new:true,
      },
      (error, allServices) => {
        res.redirect(`/Home/${req.params.id}`)
      }  
    )
})
//C
app.post('/Home', (req, res) => {
    Service.create(req.body,(error, createdService)=>{
        res.redirect("/Home")
    })
	
});

//E
app.get("/Home/:id/edit", (req, res) => {
    Service.findById(req.params.id, (error, allServices) => {
        res.render("edit.ejs", {
        service: allServices        
        })
    })
})
//S
app.get('/Home/:id', (req, res) => {
    Service.findById(req.params.id, (err, foundService) => {
        res.render('show.ejs', {
            service: foundService,
        });
    });

});
app.listen(3000, () => {
    console.log('listening....');
});