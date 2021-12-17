const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
        title: { 
            type: String, 
            required: true, 
            unique: true 
        },
        desc: { 
            type: String, 
            required: true 
        },
        img: { 
            type: String, 
            required: true 
        },
        categories: { 
            type: Array 
        },
        price: { 
            type: Number, 
            required: true 
        },
        inStock: { 
            type: Boolean, 
            default: true 
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);