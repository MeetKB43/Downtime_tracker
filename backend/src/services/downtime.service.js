const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pending = async () => {

    // Find pending DT entries
    const query = `
        SELECT
            dt_id,
            start_time::text AS start_time,
            end_time::text AS end_time,
            duration_minutes
        FROM downtime
        WHERE
            DATE(start_time) = CURRENT_DATE
            AND machine_id IS NULL
            AND issue_id IS NULL
        ORDER BY start_time;
    `;
    
    const result = await pool.query(query);
    if (result.rows.length === 0) {
       return "";
    }

    const pending = result.rows;

    // Return user
    return pending;
};

const insertDowntime = async ({machine_id, issue_id, comments, operator, dt_id}) => {
    // Validate input
    if (!dt_id || !machine_id || !issue_id ||!operator) {
        throw new Error("invalid data.");
    }
    // Find pending DT entries
    const query = `
        UPDATE downtime
        SET
            machine_id = $1,
            issue_id = $2,
            comments = $3,
            operator = $4
        WHERE
            dt_id = $5
        RETURNING *;
    `;
    const values = [machine_id,issue_id, comments, operator, dt_id];
    const result = await pool.query(query,values);
    if (result.rows.length === 0) {
        throw new Error("Downtime entry not found.");
    }

    

    // Return user
    return "Downtime updated";
};

const getMachines = async () => {
    // Find pending DT entries
    const query = `
        SELECT * FROM machine;
    `;
    const result = await pool.query(query);
    if (result.rows.length === 0) {
        throw new Error("No machines listed.");
    }

    const machines = result.rows;

    // Return user
    return machines;
};


const getIssues = async ({machine_id}) => {
    // Find pending DT entries
    const query = `
        SELECT * FROM Issue WHERE machine_id = $1;
    `;
    const result = await pool.query(query,[machine_id]);
    if (result.rows.length === 0) {
        throw new Error("No Issues listed with this machine.");
    }

    const Issues = result.rows;

    // Return user
    return Issues;
};


module.exports = {
    pending,
    insertDowntime,
    getMachines,
    getIssues
};