const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is required"],
  },
  email: {
    type: String,
    require: [true, "email is required"],
  },
  occupation: {
    type: String,
    require: [true, "Occupation is required"],
  },
  found: {
    type: String,
    require: [true, "Where found is required"],
  },
  hope: {
    type: String,
    require: [true, "hope is required"],
  },
  results: [
    {
      emotion: {
        type: String,
      },
      length: {
        type: String,
      },
      copied: {
        type: Boolean,
        default: false,
      },
      textbox: {
        type: String,
      },
      output: {
        type: String,
      },
    },
  ],
  paraphrase: [
    {
      textbox: {
        type: String,
      },
      output: {
        type: String,
      },
    },
  ],
  profileURL: {
    type: String,
  },
});
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;