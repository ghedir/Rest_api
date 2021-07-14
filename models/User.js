const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  first_Name: {
    type: "string",
    required: [true, "add your first name"],
  },
  last_Name: {
    type: "string",
    required: [true, "add your last name"],
  },
  age: {
    type: Number,
    required: [true, "add your age"],
  },
});
const user = mongoose.model("person", userSchema);
module.exports = user;
