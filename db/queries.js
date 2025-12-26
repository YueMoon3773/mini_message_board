const { get } = require('../routes/message');
const pool = require('./pool');
require('dotenv').config();

const getAllMessages = async () => {
    const { rows } = await pool.query(`SELECT * FROM ${process.env.DB_TABLE_NAME};`);
    return rows;
};

const insertMessage = async (username, messageText) => {
    await pool.query(`INSERT INTO ${process.env.DB_TABLE_NAME} (user_name, message_text) VALUES ($1, $2);`, [
        username,
        messageText,
    ]);
};

const getMessageById = async (id) => {
    const { rows } = await pool.query(`SELECT * FROM ${process.env.DB_TABLE_NAME} WHERE id = $1;`, [id]);
    return rows;
};

module.exports = {
    getAllMessages,
    getMessageById,
    insertMessage,
};
