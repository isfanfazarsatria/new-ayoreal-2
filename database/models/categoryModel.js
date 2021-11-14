const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    // Enable timestamps, it will auto create createdAt and updatedAt column to know when data has been created and updated
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = { categoryModel, categorySchema };
