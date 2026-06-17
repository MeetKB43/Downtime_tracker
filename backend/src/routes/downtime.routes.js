const express = require("express");
const router = express.Router();

const downtimeController = require("../controllers/downtime.controller");
const authenticate = require("../middleware/auth.middleware");
router.use(authenticate)
router.get("/pending", downtimeController.pending);
router.post("/insertDowntime",downtimeController.insertDowntime)
module.exports = router;