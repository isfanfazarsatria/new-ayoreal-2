const mongoose = require('mongoose')
const axios = require("axios");

//Require Model
const { ProfesionalModel } = require("../../database/models/profesionalModel");

exports.profesional_verif = async (req, res) => {
    try {
        // consumer_name = req.body.consumer_name
        const options = {
            method: "post",
            url: `https://api.asliri.id:8443/proptech_poc/verify_profesional`,
            headers: {
                'token': process.env.API_TOKEN,
                'Content-Type': 'application/json',
            },
            data: {
                trx_id: req.body.trx_id,
                nik: req.body.nik,
                name: req.body.name,
                birthdate: req.body.birthdate,
                birthplace: req.body.birthplace,
                address: req.body.address,
                identity_photo: req.body.identity_photo,
            },
        };

        const response = await axios(options)

        if (response.status == 200) {
            const newRecord = new ProfesionalModel({
                trx_id: response.data.trx_id,
                name: response.data.data.name, 
                birthdate: response.data.data.birthdate,
                birthplace: response.data.data.birthplace,
                addresponses: response.data.data.addresponses,
                identity_photo: response.data.errors.identity_photo,
            })
            const saveNewRecord = await newRecord.save()
            if (saveNewRecord) {
                res.send({
                    statusCode: 200,
                    statusText: "Success save to database",
                    newRecord
                });
            } else {
                res.send({
                    statusCode: 500,
                    statusText: "Fail to save to database",
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.send({
        statusCode: 500,
        statusText: "Failed",
        statusMessage: error,
        });
    }
}
