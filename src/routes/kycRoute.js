const express = require("express");

const route = express.Router();

const profesionalVerif = require('../controllers/kycController')

//Profesional_verif
route.post("/", profesionalVerif.profesional_verif);

module.exports = route;
