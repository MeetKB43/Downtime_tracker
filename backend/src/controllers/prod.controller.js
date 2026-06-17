const prodService = require("../services/prod.service");
exports.productionDetails = async (req, res) => {
    try {
        
        const result = await prodService.productionDetails(req.body);
        res.status(200).json({
            success: true,
            result: result
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }
};
exports.insertProductionDetails = async (req, res) => {
    try {
        
        const result = await prodService.insertProductionDetails(req.body);
        res.status(200).json({
            success: true,
            result: result
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }
};
