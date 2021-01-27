//required dependencies
const mongoose = require("mongoose");

//mongoose schema
const Schema = mongoose.Schema;

//creating full schema for DB
const WorkoutSchema = new Schema (
  {
      day: {
          type: Date,
          default: new Date()
      },
      //exercise information
      exercises: [
          {
              type: {
                  type: String,
                  trim: true,
                  required: "The exercise type is a requirement."
              },
              name: {
                  type: String,
                  trim: true,
                  required: "Name of exercise is a requirement."
              },
              duration: {
                  type: Number,
                  required: true
              },
              distance: {
                  type: Number,
                  required: true
              },
              reps: {
                  type: Number
              },
              sets: {
                  type: Number
              },
              weight: {
                  type: Number
              }
          }
      ]
  },
  {toJSON: {virtuals: true}}
)


//Function to track duration of workout
WorkoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;