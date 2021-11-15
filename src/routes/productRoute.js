const express = require("express");

const route = express.Router();

const {
    getAllProducts,
    createProduct
} = require("../controllers/productController");

// //Get All Products
route.get("/", getAllProducts);

// //Get single Category by id
// route.get("/:id", getCategory);

//Create Category
route.post("/", createProduct);

// //Update Category
// route.put("/:id", updateCategory);

// //Delete Category
// route.delete("/:id", deleteCategory);

module.exports = route;