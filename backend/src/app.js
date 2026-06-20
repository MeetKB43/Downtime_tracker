require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authController = require("./controllers/auth.controller");
const app = express();
const authRoutes = require("./routes/auth.routes");
const prodRoutes = require("./routes/prod.routes");
const downtimeRoutes = require("./routes/downtime.routes");
const cookieParser = require("cookie-parser");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("API Running");
});

app.use("/api/auth",authRoutes);
app.use("/api/prod",prodRoutes);
app.use("/api/downtime",downtimeRoutes);

app.get("/api/ping",(req,res) => {
    res.json({
        success: true,
        message: "Backend is running"
    });
});

module.exports = app;