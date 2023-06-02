const express =require("express")
require("./db/mongoose")
const cors = require("cors");
const env=require("dotenv");

const app = express();
const port = process.env.PORT;


const authRoutes = require("./routes/authRoutes");
const membersRoutes = require("./routes/memberRoutes");
const fileRoutes = require("./routes/fileRoutes")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth",authRoutes);
app.use("/member",membersRoutes);
app.use("/file",fileRoutes)

app.listen(port,()=>{
    console.log("server running on port " + port);
});
