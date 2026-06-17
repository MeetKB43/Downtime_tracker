const express = require("express");
const router = express.Router();

const prodController = require("../controllers/prod.controller");
const authenticate = require("../middleware/auth.middleware");
router.use(authenticate)
router.get("/productionDetails", prodController.productionDetails);
router.post("/productionDetails", prodController.insertProductionDetails);
module.exports = router;