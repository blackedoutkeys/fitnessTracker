// Required Dependencies
const router = require("express").Router();
const { Router } = require("mongoose");
const db = require("../models");

//  GET route that retrieves user input/workouts from the database
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
  .then((result)=>{
      res.json(result);
  })
  .catch((err)=>{
      res.json(err)
  })
});


//POST route that updates user input/workouts 
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
  .then((result)=>{
      res.json(result)
  })
  .catch((err)=>{
      res.json(err)
  })
})

// PUT route that updates user input/workouts  from an existing workout in the database
router.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    {
      $push: {
        exercises: body,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET route that gets a range of workouts from user input/workouts within the database
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
  .limit(7)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.json(err);
  });
});

module.exports = router;