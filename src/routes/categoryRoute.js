const express = require("express");

const route = express.Router();

const {
  getAllCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

//Get All Categorys
route.get("/", getAllCategorys);

//Get single Category by id
route.get("/:id", getCategory);

//Create Category
route.post("/", createCategory);

//Update Category
route.put("/:id", updateCategory);

//Delete Category
route.delete("/:id", deleteCategory);

module.exports = route;
