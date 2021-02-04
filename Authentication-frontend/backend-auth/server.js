const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

require("dotenv").config();
var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const app = express();

// app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/users", cors(corsOptions), require('./routes/users'));


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log("back-end server is running..."));

mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err) => {
        if(err) throw err
        console.log("Connection to DB Established...");
    }
);

