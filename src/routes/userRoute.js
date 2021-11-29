const express = require("express");

const route = express.Router();

const userCtrl = require("../controllers/userController");

//Profesional_verif
route.post("/", userCtrl.register);
route.post("/verify", userCtrl.activateEmail);

module.exports = route;
