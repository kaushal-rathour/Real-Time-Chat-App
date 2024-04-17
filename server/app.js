const express = require("express");
require("dotenv").config();
const session = require("express-session");
const User = require("./models/user.js");
const Chat = require("./models/chat.js");
const Message = require("./models/message.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");
const app = express();
const PORT = process.env.PORT || 3000;


const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  secret: process.env.SECRET,
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Mongo Session Error", err);
});

let sessionOptions = {
  store: store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: Date.now() + 7 * 24 + 60 * 60 * 1000,
      maxAge: 7 * 24 + 60 * 60 * 1000,
      httpOnly: true,
  },
  
}
app.use(session(sessionOptions));
app.use(express.urlencoded({ extended: true }));

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res)=> {
    res.send("Hi! Im Root");
})

app.listen(PORT, (req, res)=>{
    console.log(`Listening To ${PORT}`);
})

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Database is ready!");
}