const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        MI: {
            type: String,
            required: true
        },
        category: [
            {
              type: Schema.Types.ObjectId,
              ref: "category",
            }
        ],
        yearReturn: {
            type: String,
            default: "+10.25%"
        },
        expenseRatio: {
            type: String,
            default: "0.43%"
        },
        totalAum: {
            type: String,
            default: "5.87T"
        },
        cover_img: {
            type: String,
            default: "https://firebasestorage.googleapis.com/v0/b/tutorin-317818.appspot.com/o/logodefault%2FLogo%20AyoReal.jpeg?alt=media&token=262eedd1-90cf-42d2-816d-a188ccfbc85a",
        },
        minBuy: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            default: 5,
        },
    },
    { timestamps: true }
)

const ProductModel = mongoose.model("Product", productSchema);

module.exports = { ProductModel, productSchema };