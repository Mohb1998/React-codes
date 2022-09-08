//jshint esversion:6

//This is a node module that will help us store sensitive data
//such as API keys and cypher words
require('dotenv').config();

const express = require("express");
const bodyparser = require("body-parser");
const ejs = require("ejs");
//const swup = require("swup");
const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

//Here we require passport and its additional packages 
//passport is an all in one node module that is used to
//encrypt and decrypt data and add sessions and cookies to our website
const session = require("express-session");
const passport = require("passport");

//This is used to encrypt our database
const passportLocalMongoose = require("passport-local-mongoose");
//Please note that passport and its modules MUST be placed in the exact 
//locations as shown in this code for it to work.

//After creating a google dev account we follow the steps inpassportjs
//to start authenticating using google
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// const md5 = require("md5");
// const bcrypt = require('bcrypt');

// const saltRounds = 10;

//Here we start our level 2 encryption by requiering the mongoose encryption
//module
//var encrypt = require('mongoose-encryption');

//Note: level 1 encryption is simple password and username check
//and the password is saved in plain text

// console.log(process.env.SECRET);

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
    extended: true
}));

//Here we are only doing some standard initialization of the session
//package we imported
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

//Now we initialize passport to use for authentication
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    facebookId: String,
    secret: String
});

//Hashing and salting our data
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


//Here we encrypt our entire database
//BUT it is better to encrypt only the password as we use the 
//email to search for the user
//userSchema.plugin(encrypt, { secret: process.env.SECRET , encryptedFields: ['password']});

const User = new mongoose.model("User", userSchema);

//Here we setup the model to be serialized and deserialized
passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);

        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/secrets"
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
            facebookId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

//console.log(md5("123456"));

app.get("/", function (req, res) {

    res.render("home.ejs");

});

app.get("/secrets", function (req, res) {

    //When we will redirect the user from the register or login pages 
    //to our secrets page we will first check if he is authenticated 
    //using passport if he is then : 

    // if (req.isAuthenticated()) {
    //     res.render("secrets")
    // }
    // //if he is not then : 
    // else {
    //     res.render("/login.ejs");
    // }

    User.find({
        "secret": {
            $ne: null
        }
    }, function (err, foundUsers) {
        if (err) {
            console.log(err);
        } else {
            if (foundUsers) {
                res.render("secrets.ejs", {
                    usersWithSecrets: foundUsers
                })
            }
        }
    });

});

app.get("/register", function (req, res) {

    res.render("register.ejs");

});

//Here we will handle our post request but by using passport
app.post("/register", function (req, res) {

    User.register({
        username: req.body.username
    }, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    });

});

// app.post("/register", function (req, res) {

//     bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

//         //Create a new user entry
//         const newUser = new User({
//             userName: req.body.username,
//             //password: md5(req.body.password)
//             password: hash
//         });

//         //Save the new user
//         newUser.save(function (err) {
//             if (!err) {
//                 console.log("New user succesfully added.");
//                 res.render("secrets.ejs");
//             } else {
//                 console.log("Failed to add new user.");
//             }
//         });

//     });

// });

app.get("/login", function (req, res) {

    res.render("login.ejs");

});

app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.username,
        passwor: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            });
        }
    })
});

// app.post("/login", function (req, res) {

//     const username = req.body.username;
//     const password = req.body.password;
//     //const password = md5(req.body.password);

//     User.findOne({
//         userName: username
//     }, function (err, foundUser) {
//         if (err) {
//             console.log(err);
//         } else {
//             if (foundUser) {
//                 console.log("Checking password")

//                 bcrypt.compare(password, foundUser.password, function (err, result) {
//                     if (result === true) {
//                         res.render("secrets.ejs");
//                     }
//                 })

//                 // if (foundUser.password === password) {
//                 //     res.render("secrets.ejs");
//                 // }
//                 // else
//                 // {
//                 //     console.log("Oops");
//                 // }
//             }

//         }
//     })
// });

app.get("/submit", function (req, res) {
    if (req.isAuthenticated) {
        res.render("submit.ejs");
    }
});

app.post("/submit", function (req, res) {

    const submittedSecret = req.body.secret;

    User.findById(req.user.id, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                foundUser.secret = submittedSecret;

                foundUser.save(function () {
                    res.redirect("/secrets")
                });
            }
        }
    });

});

app.get("/auth/google",
    passport.authenticate('google', {
        scope: ["profile"]
    })
);

app.get('/auth/google/secrets',
    passport.authenticate('google', {
        failureRedirect: '/login.ejs'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });

/*****************************************************/

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
    passport.authenticate('facebook', {
        failureRedirect: '/login.ejs'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });


app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server running");
});