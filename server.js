const mongoose = require('mongoose');
require('dotenv').config();
const express= require('express');
const app = express();
const Service = require("./models/beauty.js");
const path = require('path');

const methodOverride = require('method-override');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI , {
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
app.use(express.static(path.join(__dirname,"public")))


//I
app.get('/', (req, res) => {
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
    res.redirect("/");
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
        res.redirect("/")
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
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });