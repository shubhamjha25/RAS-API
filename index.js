const express = require('express');

const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, 
        { useNewUrlParser: true, useUnifiedTopology: true },
    )
    .then(() => console.log("MongoDB Connected ..."))
    .catch((err) => console.log(err));

app.listen(port || 5000, () => {
    console.log(`Server Running on Port ${port}`)
}); 