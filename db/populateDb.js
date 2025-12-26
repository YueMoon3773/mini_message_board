#! /usr/bin/node

const { Client } = require('pg');
require('dotenv').config();

const SQL = `
DROP TABLE ${process.env.DB_TABLE_NAME};

CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE_NAME} (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTIFY,
    userName VARCHAR(30),
    messageText VARCHAR(255),
    createdTime TIMESTAMP DEFAULT NOW()
);

INSERT INTO ${process.env.DB_TABLE_NAME} (userName, text) VALUES
    ('The Joker', 'Why so serious?'),
    ('T'Challa', 'Wakanda Forever!'),
    ('Dory', 'Just keep swimming'),
    ('Buzz Lightyear', 'To infinity and beyond!'),
    ('Captain America', 'Avengers... assemble.'),
    ('Gollum', 'My precious');
`;

async function main() {
    console.log('PREPARING DB...');
    const client = new Client({
        connectionString: `postgresql://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('DB SET UP DONE');
}

main();
