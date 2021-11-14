const express = require("express");

const route = express.Router();

const {
    createProduct
} = require("../controllers/productController");

// //Get All Categorys
// route.get("/", getAllCategorys);

// //Get single Category by id
// route.get("/:id", getCategory);

//Create Category
route.post("/", createProduct);

// //Update Category
// route.put("/:id", updateCategory);

// //Delete Category
// route.delete("/:id", deleteCategory);

module.exports = route;
