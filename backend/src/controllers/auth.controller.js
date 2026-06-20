const authService = require("../services/auth.service");
exports.login = async (req, res) => {
    try {
        
        const result = await authService.login(req.body);
        res.cookie("token", result.token, {
            httpOnly: true,
            sameSite: "lax", // or "strict"
            secure: false,
            maxAge: 12 * 60 * 60 * 1000 // 12 hours
        });

        res.status(200).json({
            success: true,
            user: {
                id: result.user.id,
                role: result.user.role
            }
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }
};

exports.me = (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
};

exports.logout = async (req,res) => {
    res.clearCookie("token");

    res.status(200).json({
        success: true,
        message: "Logged out successfully."
    });
}