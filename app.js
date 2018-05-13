const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const states = require('./models/states');
const mongoose = require('mongoose')
require('mongoose-double')(mongoose);

const session = require('client-sessions');
const bcrypt = require('bcryptjs');

const User = require("./models/user");
const Bill = require("./models/bill");

let display = "none";

function requireLogin (req, res, next) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      next();
    }
};


mongoose.connect("mongodb://localhost/test_app");


app.set('view engine', 'ejs');

// app.use(express.static(__dirname + "public"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    cookieName: "session",
    secret: "daseqw1231fsaAADfdfa",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

app.use(function(req, res, next) {
    res.locals.states = states;
    if (req.session && req.session.userId) {
      User.findById(req.session.userId, function(err, foundUser) {
        if (foundUser) {
          foundUser.password = undefined; // delete the password from the foundUser
          req.session.userId = foundUser._id;  //refresh the session value
          req.user = foundUser;
          res.locals.user = foundUser;
        }
        // finishing processing the middleware and run the route
        next();
      });
    } else {
      next();
    }
});


//get routes
app.get("/", (req, res) => {
    res.render("about");
});

app.get("/register", (req, res) => {
    res.render("register",{ error:  "", display: "none"});
});

app.get("/login", (req, res) => {
    res.render("login", {error : "", display: "none"} );
});

app.get("/logout", (req, res) => {
    req.session.reset();
    res.redirect("/login");
});

app.get("/dashboard", requireLogin, (req, res) => {
    res.render("dashboard");
});

app.get("/bills",requireLogin, (req, res) => {
    res.render("bills/index");
});

app.get("/bills/new", requireLogin, (req, res) => {
    res.render("bills/new");
});

app.get("/bills/:id",requireLogin, (req, res) => {
    res.send("ok");
});

app.get("/users/:id/edit", (req, res) => {
    res.status(200).send("Edit user route");
});



app.get("*", (req, res) => {
    res.status(404).send("404 Page Not Found.");
});


//post routes
app.post("/register", (req, res) => {
    let hash = bcrypt.hashSync(req.body.user.password, 14);
    req.body.user.password = hash;
    let newUser = new User(req.body.user);
    newUser.save((err) => {
        if(err){
            let error = "Something bad happened! Please try again.";
            if(err.code === 11000){
                error = "The email Id is already taken! Try another email id.";
            }
            return res.render("register", {error : error, display: "block"});
        }
        res.redirect("/dashboard");
    });
});

app.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
        if(err || !foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)){
            return res.render("login", {error: "Incorrect email or password.", display: "block" });
        }
        req.session.userId = foundUser._id;
        res.redirect("/dashboard");
    });
});

app.post("/bills", requireLogin, (req, res) => {
    let newBill = new Bill(req.body);
    newBill.save((err) => {
        if(err){
            return res.send(err);
        } else {
            User.findById(req.session.userId, (err, foundUser) => {
                foundUser.bills.push(newBill);
                foundUser.save((err) => {
                    if(err){
                        res.status(501).send("Internal server error. Couldn't save it");
                    } else {
                        res.send(foundUser);
                    }
                });
            })
        }
    });
});

app.listen(3000, () => {
    console.log(`Server is started`);
});