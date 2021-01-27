//required dependencies
const mongoose = require("mongoose");

//mongoose schema
const Schema = mongoose.Schema;

//creating full schema for DB
const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: new Date(),
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Type is required.",
        },
        name: {
          type: String,
          trim: true,
          required: "Name is required.",
        },
        duration: {
          type: Number,
          required: true,
        },
        distance: Number,
        weight: Number,
        reps: Number,
        sets: Number,
      },
    ],
  },
  { toJSON: { virtuals: true } }
);


const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;