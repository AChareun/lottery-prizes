require('dotenv').config();

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: process.env.DATABASE_URL,
    },
};
