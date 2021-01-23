const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
// add virtual for totalDuration
WorkoutSchema.virtual("totalDuration").get(function () {
  let totalDuration = 0;
  for (let i = 0; i < this.exercises.length; i++) {
    totalDuration += this.exercises[i].duration;
  }
  return totalDuration;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;