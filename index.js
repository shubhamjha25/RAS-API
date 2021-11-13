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

app.use(express.static("public"));

// initial response
app.get("/", (req, res) => {
    res.sendFile('public/index.html', {root: __dirname })
});

// middleware for error handling
app.use(function(req, res, next) {
    res.sendFile('public/error.html', {root: __dirname })
})

app.listen(port || 5000, () => {
    console.log(`Server Running on Port ${port}`)
}); 