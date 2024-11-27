const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body

app.get("/", function (req, res) {
  res.send("Welcome To MY Hotel , How Can I help You");
});

// hel

// app.post("/person", (req, res) => {
//   const data = req.body;

//   // create a new person document using Mongoose model

//   const newPerson = new Person(data);

//   // To avoid this we directly pass the data
//   // newPerson.name = data.name;
//   // newPerson.age = data.age;

//   // save the new person  to the database
//   // this were the old practice , so we use async await s
//   // newPerson.save((error, savedPerson) => {
//   //   if (error) {
//   //     console.log("Error saving person ", error);
//   //     res.status(500).json({ error: "Internal Server Error" });
//   //   } else {
//   //     console.log("data saved succesfully");
//   //     res.status(200).json(savedPerson);
//   //   }
//   // });
// });

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

// Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("Server is listing to port 3000");
});
