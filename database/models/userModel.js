const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      allowNull: false,
    },
    password: {
      type: String,
      required: true,
      allowNull: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);