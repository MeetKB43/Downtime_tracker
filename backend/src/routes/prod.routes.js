const express = require("express");
const router = express.Router();

const prodController = require("../controllers/prod.controller");
const authenticate = require("../middleware/auth.middleware");
router.use(authenticate)
router.post("/productionDetails", prodController.productionDetails);
router.post("/insertProductionDetails", prodController.insertProductionDetails);
router.post("/updateProductionDetails", prodController.updateProductionDetails);
module.exports = router;