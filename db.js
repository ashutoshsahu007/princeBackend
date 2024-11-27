const mongoose = require("mongoose");

// Define the mongoDB connection URL

const mongoURL = "mongodb://localhost:27017/mycustomdatabase"; // Replace mycustomdatabase with your database name

// setup mongoDB Connection
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
// Mongoose maintains a default connection object representing the mongoDB connection

const db = mongoose.connection;

// Define event listeners for database connection
db.on("connected", () => {
  console.log("Connected to mongoDB server  ");
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected ");
});

db.on("error", (err) => {
  console.log("MongoDB connection error ", err);
});

// Export the database Connection
module.exports = db;
