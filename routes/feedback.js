const Feedback = require("../models/Feedback");
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");

const router = require("express").Router();

// SEND A FEEDBACK
router.post("/new", verifyToken, async (req,res) => {
    const newFeedback = new Feedback(req.body);

    try {
        const savedFeedback = await newFeedback.save();
        res.status(200).json(savedFeedback);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET ALL FEEDBACKS (ADMIN ONLY)
router.get("/all", verifyTokenAndAdmin, async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;