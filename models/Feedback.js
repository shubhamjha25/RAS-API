const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    rating: { 
        type: Number, 
        required: true,
        max: 5,
        min: 1 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);