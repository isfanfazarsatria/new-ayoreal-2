//require model
const mongoose = require("mongoose");
const { categoryModel } = require("../../database/models/categoryModel");
const { productModel } = require("../../database/models/productModel");

//Get all Category
// exports.getAllCategorys = async (req, res) => {
//   //Pagination
//   const page = parseInt(req.query.page);
//   const limit = parseInt(req.query.limit);

//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;

//   const data = {};

//   if (endIndex < (await categoryModel.countDocuments().exec())) {
//     data.next = {
//       page: page + 1,
//       limit: limit,
//     };
//   }

//   if (startIndex > 0) {
//     data.previous = {
//       page: page - 1,
//       limit: limit,
//     };
//   }
//   try {
//     data.total_data = await categoryModel.countDocuments().exec();
//     data.results = await categoryModel
//       .find()
//       .limit(limit)
//       .skip(startIndex)
//       .exec();

//     res.json({
//       statusCode: 200,
//       statusText: "success",
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       statusCode: 500,
//       statusText: "fail",
//       statusMessage: error,
//     });
//   }
// };

//Get a Category by ID
exports.getCategory = async (req, res) => {
  const _id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.send({
      statusCode: 500,
      statusText: "fail",
      statusMessage: "Format Id invalid",
    });
  } else {
    const data = await categoryModel.findById(_id);

    if (!data) {
      return res.send({
        statusCode: 500,
        statusText: "fail",
        statusMessage: "Id not found",
      });
    } else {
      res.send({
        statusCode: 200,
        statusText: "success",
        data,
      });
    }
  }
};

//Create Category
exports.createCategory = async (req, res) => {
  const data = await categoryModel(req.body);
  try {
    await data.save();
    res.status(201).json({
      statusCode: 200,
      statusText: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(409).json({
      statusCode: 409,
      message: "Fail.",
      statusText: "error",
    });
  }
};

//Update Category
exports.updateCategory = async (req, res) => {
  const _id = req.params.id;
  const newData = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.send({
      statusCode: 500,
      statusText: "fail",
      statusMessage: "Format Id invalid",
    });
  } else {
    const data = await categoryModel.findById(_id);
    if (!data) {
      return res.send({
        statusCode: 500,
        statusText: "fail",
        statusMessage: "Id not found",
      });
    } else {
      const updatedCategory = await categoryModel.findByIdAndUpdate(
        _id,
        newData,
        {
          new: true,
        }
      );
      return res.send({
        statusCode: 200,
        statusText: "success",
        data: updatedCategory,
      });
    }
  }
};

//Delete Category by ID
exports.deleteCategory = async (req, res) => {
  const _id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.send({
      statusCode: 500,
      statusText: "fail",
      statusMessage: "Format Id invalid",
    });
  } else {
    const data = await categoryModel.findById(_id);
    if (!data) {
      return res.send({
        statusCode: 500,
        statusText: "fail",
        statusMessage: "Id not found",
      });
    } else {
      await CategoryModel.findByIdAndRemove(_id);
      return res.send({
        statusCode: 500,
        statusText: "fail",
        statusMessage: "Category deleted succesfully",
      });
    }
  }
};
