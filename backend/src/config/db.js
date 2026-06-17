const { Pool } = require("pg");
let pool;


/**
 * Create and return a singleton PostgreSQL pool connection
 * for Neon DB.
 */
const getPool = () => {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,

            // Neon requires SSL
            ssl: {
                rejectUnauthorized: false
            },

            // Optional tuning (good for production stability)
            max: 10,              // max connections in pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 5000
        });

        // Optional: log connection errors globally
        pool.on("error", (err) => {
            console.error("Unexpected PostgreSQL error:", err);
        });
    }
    return pool;
};

module.exports = getPool();