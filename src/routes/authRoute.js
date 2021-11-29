const router = require("express").Router();

// const authController = require("../controllers/authController");
// const tokenMiddleware = require("../middleware/tokenMiddleware");
const { AuthModel } = require("../../database/models/authModel");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID, TWILIO_NUMBER } = process.env;
const express = require('express');
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


router.post("/otp", async (req, res) => {
    const { phone } = req.body;
    const auth = await AuthModel.findOne({ phone });
    if (auth) {
        const { channel, isVerified } = auth;
        if (channel === "sms" && isVerified) {
            return res.status(400).json({
                message: "Phone number has been verified",
            });
        }
        if (channel === "sms" && !isVerified) {
            return res.status(400).json({
                message: "Phone number has not been verified",
            });
        }
    }
    const otp = Math.floor(Math.random() * 1000000);
    const message = `Your OTP is ${otp}`;
    if (channel === "sms") {
        twilio.verify.services(VERIFICATION_SID)
            .verifications
            .create({ to: `+62${req.body.phone}` })
            .then(verification => {
                console.log(verification.status);
                return res.status(200).json({
                    message: "OTP has been sent",
                });
            }
            );
    }
    const newAuth = new AuthModel({
        phone,
        channel,
        otp,
    });
    await newAuth.save();
    //validasi jika user resend otp
    //validasi jika nomor telfon tidak di isi
    // try {
    //     const { phone } = req.body;
    //     const user = await AuthModel.findOne({ isVerified: false, phone });
    //     if (user) {
    //         return res.status(400).json({
    //             message: "Number already exists"
    //         });
    //     } else {
    //         twilio.verify.services(VERIFICATION_SID).verifications
    //         .create({ to: `+62${req.body.phone}`, channel: 'sms' })
    //         .then(verification => {
    //             res.send({ verification });
    //             });
    //             const newUser = new AuthModel({
    //                 phone,
    //             });
    //             await newUser.save();
    //         return res.status(200).json({
    //             message: "Number registered successfully",
    //             data : phone
    //         });
    //     }
    // } catch (error) {
    //     return res.status(500).json({
    //         message: error.message
    //     });
    // }
});

router.post("/verify", async (req, res) => {
    try {
        const { phone, code } = req.body;
        const user = await AuthModel.findOne({ phone });
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        const verification = await twilio.verify.services(VERIFICATION_SID).verificationChecks
            .create({ to: `+62${req.body.phone}`, code });
        if (verification.status === "approved") {
            return res.status(200).json({
                message: "Number verified successfully",
                verification
            });
        }
        return res.status(400).json({
            message: "Invalid verification code",
            verification
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});


module.exports = router;
