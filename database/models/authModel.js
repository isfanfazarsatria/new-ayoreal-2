const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    phone: {
      type: String,
      allowNull: false,
    },
    channel: {
      type: String,
      default: "sms",
    },
    isVerified: {
      type: Boolean,
      default: false,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

const AuthModel = mongoose.model("Auth", authSchema);

module.exports = { AuthModel, authSchema };
