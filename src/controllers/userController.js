const Users = require('../../database/models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {CLIENT_URL} = process.env;
const sendMail = require('../controllers/sendMail');

const userCtrl = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({
                    message: 'Email and password are required'
                });
            }
            if (!validateEmail(email)) {
                res.status(400).json({
                    message: 'Email is not valid'
                });
            }

            const user = await Users.findOne({ email });
            if (user) {
                res.status(400).json({
                    message: 'Email already exists'
                });
            }

            if(password.length < 6) {
                res.status(400).json({
                    message: 'Password must be at least 6 characters'
                });
            }

            const passwordHash = await bcrypt.hash(password, 12);
            const newUser = new Users({
                email,
                password: passwordHash
            });

            const activationToken = createActivationToken(newUser);

            const url = `${CLIENT_URL}/user/activate/${activationToken}`;
            sendMail(email, url);

            res.json({ message: 'Please Verify Your Email' });      
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVE_TOKEN);

            const {name, email, password} = user

            const check = await Users.findOne({email})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newUser = new Users({
                name, email, password
            })

            await newUser.save()

            res.json({msg: "Account has been activated!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVE_TOKEN, { expiresIn: '30m' });
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1h' });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '7d' });
}
module.exports = userCtrl;