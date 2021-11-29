const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileRiskSchema = new Schema(
  {
    score1: {
        
    },
  },
  {
    timestamps: true,
  }
);

const ProfileRiskModel = mongoose.model("ProfileRisk", profileRiskSchema);

module.exports = { ProfileRiskModel, profileRiskSchema };
