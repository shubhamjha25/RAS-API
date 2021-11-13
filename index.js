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

app.get("/", (req, res) => {
    res.sendFile('index.html', {root: __dirname })
});

app.use(function(req, res, next) {
    res.sendFile('error.html', {root: __dirname })
})

app.listen(port || 5000, () => {
    console.log(`Server Running on Port ${port}`)
}); 