const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async ({ role, password }) => {
    // Validate input
    if (!role || !password) {
        throw new Error("Username and password are required.");
    }

    // Find user
    const query = `
        SELECT
            id,
            role,
            password
        FROM public.users
        WHERE role = $1
    `;

    const result = await pool.query(query, [role]);
    if (result.rows.length === 0) {
        throw new Error("Invalid username or password.");
    }

    const user = result.rows[0];

    passwordMatch = (password == user.password)
    if (!passwordMatch) {
        throw new Error("Invalid username or password.");
    }
    // Generate JWT
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "12h"
        }
    );

    // Return user
    return {
        token,
        user: {
            id: user.id,
            role: user.role
        }
    };
};

module.exports = {
    login
};