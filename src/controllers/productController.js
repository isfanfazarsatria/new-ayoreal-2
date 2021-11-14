const { categoryModel } = require("../../database/models/categoryModel");
const { ProductModel } = require("../../database/models/productModel");
const mongoose = require("mongoose");
const e = require("express");


exports.createProduct = async (req, res) => {
    try {
        const { MI, category, yearReturn, expenseRatio, totalAum, cover_img, minBuy, rating } = req.body;
        const categoryId = mongoose.Types.ObjectId(category);
        const newProduct = new ProductModel({
            MI,
            category: categoryId,
            yearReturn,
            expenseRatio,
            totalAum,
            cover_img,
            minBuy,
            rating
        });
        await newProduct.save();
        res.status(201).json({
        message: "Product created successfully",
        data: newProduct,
        });
    } catch (error) {
        res.status(500).json({
        message: error.message
        });
    }
};