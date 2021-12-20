const { verifyTokenAndAuthorization } = require('../middlewares/verifyToken');
const User = require('../models/User');
const CryptoJS = require("crypto-js");

const router = require('express').Router();

// Update User
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_PHRASE).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body, }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete User 
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Account Deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;