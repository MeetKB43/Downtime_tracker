const express = require("express");
const router = express.Router();

const downtimeController = require("../controllers/downtime.controller");
const authenticate = require("../middleware/auth.middleware");
router.use(authenticate)
router.get("/pending", downtimeController.pending);
router.post("/insertDowntime",downtimeController.insertDowntime);
router.post("/getMachines", downtimeController.getMachines);
router.post("/getIssues", downtimeController.getIssues);
module.exports = router;