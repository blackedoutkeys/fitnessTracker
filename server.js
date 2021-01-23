const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const morgan = require("morgan");
const db = require("./models");
const app = express();

const PORT = process.env.PORT || 3000;

// const workoutController = require("./controllers/workoutController");

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// Route
app.use(require("./routes/api-routes"));


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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});