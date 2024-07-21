const express = require('express');
const pool = require('./db');
const port = 3000;

const app = express();
app.use(express.json());

// Creating tables if they don't exist
app.get('/setup', async (req, res) => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS clients (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                date_of_birth DATE NOT NULL,
                main_language VARCHAR(50),
                secondary_language VARCHAR(50),
                funding_source VARCHAR(50) NOT NULL
            )
        `);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS funding_sources (
                id SERIAL PRIMARY KEY,
                source_name VARCHAR(50) NOT NULL
            )
        `);
        await pool.query(`
            INSERT INTO funding_sources (source_name) VALUES
            ('NDIS'), ('HCP'), ('CHSP'), ('DVA'), ('HACC')
            ON CONFLICT (source_name) DO NOTHING
        `);
        res.status(200).send({message: "Successfully created tables"});
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// CRUD endpoints for clients
app.get('/clients', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM clients');
        res.status(200).json(data.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.get('/clients/:id', async (req, res) => {
    try {
        const data = await pool.query('SELECT * FROM clients WHERE id = $1', [req.params.id]);
        res.status(200).json(data.rows[0]);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.post('/clients', async (req, res) => {
    const { name, date_of_birth, main_language, secondary_language, funding_source } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO clients (name, date_of_birth, main_language, secondary_language, funding_source) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, date_of_birth, main_language, secondary_language, funding_source]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.put('/clients/:id', async (req, res) => {
    const { name, date_of_birth, main_language, secondary_language, funding_source } = req.body;
    try {
        const result = await pool.query(
            'UPDATE clients SET name = $1, date_of_birth = $2, main_language = $3, secondary_language = $4, funding_source = $5 WHERE id = $6 RETURNING *',
            [name, date_of_birth, main_language, secondary_language, funding_source, req.params.id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.delete('/clients/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM clients WHERE id = $1', [req.params.id]);
        res.status(200).json({ id: req.params.id });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));