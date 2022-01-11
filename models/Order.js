const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { 
        type: String, 
        required: true 
    },
    username: {
        type: String,
        required: true
    },
    items: [
        {
            itemId: {
                type: String
            },
            title: {
                type: String
            },
            img: {
                type: String
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            }
        } ,
    ],
    amount: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        default: "pending" 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);