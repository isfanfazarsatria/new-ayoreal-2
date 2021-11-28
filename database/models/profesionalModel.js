const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profesionalSchema = new Schema({
	trx_id: {
		type: String,
	},
	name: {
		type: String,
	},
	birthdate: {
		type: String,
	},
	birthplace: {
		type: String
	},
	address: {
		type: String
	},
	identity_photo: {
		type: String
	}
});

const ProfesionalModel = mongoose.model("Profesional", profesionalSchema);

module.exports =  { ProfesionalModel, profesionalSchema };