require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authController = require("./controllers/auth.controller");
const app = express();
const authRoutes = require("./routes/auth.routes");
const prodRoutes = require("./routes/prod.routes");
const downtimeRoutes = require("./routes/downtime.routes");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("API Running");
});

app.use("/api/auth",authRoutes);
app.use("/api/prod",prodRoutes);
app.use("/api/downtime",downtimeRoutes);
/*
app.get("/api/downtime/production",(req,res){

})

app.post("/api/downtime/production",(req,res){

})

app.get("/api/downtime/pending",(req,res){

})

app.get("/api/machine-types",(req,res){

})

app.get("/api/issues",(req,res){

})

app.post("/api/downtime/")*/
module.exports = app;