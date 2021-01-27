// Required Dependencies
const router = require("express").Router();
const {
  Router
} = require("mongoose");
const db = require("../models");

//  GET route that retrieves user input/workouts from the database
router.get("/api/Workouts", (req, res) => {
  db.Workout.aggregate([{
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        },
      },
    }, ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//POST route that updates user input/workouts 
router.post("/api/Workouts", (req, res) => {
  db.Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});


// PUT route that updates user input/workouts  from an existing workout in the database
router.put("/api/Workouts/:id", ({
  body,
  params
}, res) => {
  db.Workout.findByIdAndUpdate(
      params.id, {
        $push: {
          exercises: body,
        },
      }, {
        new: true,
        runValidators: true,
      }
    )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET route that gets a range of workouts from user input/workouts within the database
router.get("/api/Workouts/range", (req, res) => {
  db.Workout.aggregate([
    { $sort: { day: -1 } },
    { $limit: 7 },
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;