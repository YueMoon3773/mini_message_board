#! /usr/bin/env node

const { Client } = require('pg');
require('dotenv').config();

const SQL = `
DROP TABLE IF EXISTS ${process.env.DB_TABLE_NAME};

CREATE TABLE IF NOT EXISTS ${process.env.DB_TABLE_NAME} (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    userName VARCHAR(30),
    messageText VARCHAR(255),
    createdTime TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO ${process.env.DB_TABLE_NAME} (userName, messageText) VALUES
    ('The Joker', 'Why so serious?'),
    ('T Challa', 'Wakanda Forever!'),
    ('Dory', 'Just keep swimming'),
    ('Buzz Lightyear', 'To infinity and beyond!'),
    ('Captain America', 'Avengers... assemble.'),
    ('Gollum', 'My precious');
`;

async function main() {
    console.log('PREPARING DB...');
    const client = new Client({
        connectionString: `${process.env.DB_URL}`,
    });
    console.log('DONE SETTING CONNECTION STRING');

    await client.connect();
    console.log('CONNECTED TO DB');

    await client.query(SQL);
    console.log('CREATED TABLE AND INSERTED DATA');

    await client.end();
    console.log('DB SET UP DONE');
}

main();
