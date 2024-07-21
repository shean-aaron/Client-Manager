const express = require('express');
const cors = require('cors');
const pool = require('./db');
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

const setupDatabase = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS clients (
          id SERIAL PRIMARY KEY,
          client_id VARCHAR(50) NOT NULL UNIQUE,
          name VARCHAR(100) NOT NULL,
          date_of_birth DATE NOT NULL,
          main_language VARCHAR(50) NOT NULL,
          secondary_language VARCHAR(50),
          funding_source VARCHAR(50) NOT NULL
        )
      `);
      console.log('Created clients table.');

      await pool.query(`
        CREATE TABLE IF NOT EXISTS funding_sources (
          id SERIAL PRIMARY KEY,
          source_name VARCHAR(50) NOT NULL UNIQUE
        )
      `);
      console.log('Created funding_sources table.');

      await pool.query(`
        INSERT INTO funding_sources (source_name) VALUES
        ('NDIS'), ('HCP'), ('CHSP'), ('DVA'), ('HACC')
        ON CONFLICT (source_name) DO NOTHING
      `);
      console.log('Inserted default funding sources.');

      return;
    } catch (err) {
      console.error('Error setting up database:', err);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  console.error('Could not connect to the database.');
};

setupDatabase();

app.get('/setup', async (req, res) => {
  try {
    await setupDatabase();
    res.status(200).send({ message: "Successfully created tables" });
  } catch (err) {
    console.error('Error in /setup:', err);
    res.sendStatus(500);
  }
});

app.get('/clients', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM clients');
    res.status(200).json(data.rows);
  } catch (err) {
    console.error('Error in /clients GET:', err);
    res.sendStatus(500);
  }
});

app.get('/clients/:id', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM clients WHERE id = $1', [req.params.id]);
    res.status(200).json(data.rows[0]);
  } catch (err) {
    console.error('Error in /clients/:id GET:', err);
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
    console.error('Error in /clients POST:', err);
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
    console.error('Error in /clients/:id PUT:', err);
    res.sendStatus(500);
  }
});

app.delete('/clients/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM clients WHERE id = $1', [req.params.id]);
    res.status(200).json({ id: req.params.id });
  } catch (err) {
    console.error('Error in /clients/:id DELETE:', err);
    res.sendStatus(500);
  }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
