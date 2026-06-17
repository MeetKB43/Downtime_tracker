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
            sku,
            operator
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

const insertProductionDetails = async ({ Date, sku, job_number, operator }) => {
    // Validate input
    if (!Date || !sku || !job_number || !operator) {
        throw new Error("Invalid data.");
    }

    // Find today's job number and SKU
    const query = `
        INSERT INTO production (date, sku, job_number, operator) VALUES ($1, $2, $3, $4)
    `;
    const value = [Date, sku, job_number, operator];
    const result = await pool.query(query, value);
    if (result == null) {
        throw new Error("Invalid Data.");
    }

    const productionData = result.rows[0];

    // Return user
    return productionData;
};



module.exports = {
    productionDetails, insertProductionDetails
};