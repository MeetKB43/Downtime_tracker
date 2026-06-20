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

const insertProductionDetails = async ({ Date, sku, job_number }) => {
    // Validate input
    if (!Date || !sku || !job_number ) {
        throw new Error("Invalid data.");
    }

    // Find today's job number and SKU
    const query = `
        INSERT INTO production (date, sku, job_number) VALUES ($1, $2, $3)
    `;
    const value = [Date, sku, job_number];
    const result = await pool.query(query, value);
    if (result == null) {
        throw new Error("Invalid Data1.");
    }

    const productionData = result.rows[0];

    // Return user
    return productionData;
};

const updateProductionDetails = async ({ Date, sku, job_number}) => {
    // Validate input
    if (!Date || !sku || !job_number) {
        throw new Error("Invalid data.");
    }

    // Find today's job number and SKU
    const query = `
        UPDATE production
        SET
            sku = $2,
            job_number = $3
        WHERE
            Date = $1
        RETURNING *;
    `;
    const value = [Date, sku, job_number];
    const result = await pool.query(query, value);
    if (result == null) {
        throw new Error("Invalid Data1.");
    }

    const productionData = result.rows[0];

    // Return user
    return productionData;
};

module.exports = {
    productionDetails, insertProductionDetails, updateProductionDetails
};