const mongoose = require("mongoose");

const exerciseUserSchema = new mongoose.Schema({
  username: { type: String, required: true }
});

const ExerciseUser = mongoose.model("ExerciseUser", exerciseUserSchema);

module.exports = { ExerciseUser };
