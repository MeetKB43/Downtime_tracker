const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const productionDetails = async ({ Date }) => {
    // Validate input
    if (!Date) {
        throw new Error("Today's date is required.");
    }

    // Find today's job number and SKU
    const query = `
        SELECT
            id,
            date,
            job_number,
            sku
        FROM public.production
        WHERE date = $1
    `;

    const result = await pool.query(query, [Date]);
    if (result.rows.length === 0) {
        throw new Error("No record found for today.");
    }

    const productionData = result.rows[0];

    // Return user
    return productionData;
};



module.exports = {
    productionDetails
};