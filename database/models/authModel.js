const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    phone: {
      type: String,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model("Auth", authSchema);

module.exports = { AuthModel, authSchema };
