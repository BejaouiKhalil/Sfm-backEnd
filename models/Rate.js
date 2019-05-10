const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const rateSchema = Schema({
  //user
  vote: {
    type: Number,
    required: true
  },
  comment: String,
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});
const rate = mongoose.model("Rate", rateSchema);
module.exports = rate;
