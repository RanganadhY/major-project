const mongoose = require("mongoose");
const env = require("dotenv");

env.config({path:__dirname + "/../env/.env"});
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error",(error)=>console.log(error))
db.once("open",()=>console.log("Connected to Database"));
