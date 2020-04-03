/**
 *  Expose all environment variables as constants here
 */
module.exports = {
    JWT_KEY: process.env.JWT_KEY,

    /**
     * This variable serves for NeDB as a prototype template,
     * You may replace by other databases as PostgreSQL, MySQL, MongoDB...
     */
    DB_STORE: process.env.DB_STORE
};
