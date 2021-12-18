const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

// REGISTER USER
router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_PHRASE).toString()
        });

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN USER
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if(!user) {
            return res.status(404).json("Invalid Username");
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_PHRASE);
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(OriginalPassword !== req.body.password) {
            return res.status(400).json("Incorrect Password");
        }

        const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        );

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;