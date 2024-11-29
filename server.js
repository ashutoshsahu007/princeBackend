const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next(); // move on to next phase
};

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    // authentication logic here
    try {
      console.log("Recieved credentials :", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const isPasswordMatch = user.password === password ? true : false;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

app.use(passport.initialize());

app.get(
  "/",
  passport.authenticate("local", { session: false }),
  function (req, res) {
    res.send("Welcome To MY Hotel , How Can I help You");
  }
);

// MiddleWare Function

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

// Use the routers
app.use("/person", personRoutes);
app.use("/menu", logRequest, menuRoutes);

app.listen(PORT, () => {
  console.log("Server is listing to port 3000");
});
