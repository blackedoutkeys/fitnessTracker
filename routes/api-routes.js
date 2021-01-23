const router = require("express").Router();
const db = require("../models");

router.get("/api/workout", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", ({body, params},res) => {
  let id = params.id;
  db.Workout.findByIdAndUpdate(
      id,
      { $push: { exercises: body }},
      { new: true, runValidators: true }
  ).then((dbWorkout) => {
      res.json(dbWorkout);
  })
  .catch((err) => {
      res.json(err);
  });
});

router.post("/api/workouts", async (req,res) => {
  db.Workout.create(req.body)
  .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
  }).catch((err) => {
      res.json(err);
  });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = router;