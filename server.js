//Required Dependencies 
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const app = express();

const PORT = process.env.PORT || 3000;

//express app setup for handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// HTTP request logger middleware
app.use(logger("dev"));

//static content pushed from the public folder
app.use(express.static("public"));

//connection to the database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


//mongoose connection logs
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: ", err);
});

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

// Route
app.use(require("./routes/api-routes"));
app.use(require("./routes/html-routes"));


//server connection successful console log
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});