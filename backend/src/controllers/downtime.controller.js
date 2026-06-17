const downtimeService = require("../services/downtime.service");
exports.pending = async (req, res) => {
    try {
        const result = await downtimeService.pending();
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
exports.insertDowntime = async (req, res) => {
    try {
        const result = await downtimeService.insertDowntime(req.body);
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
