DO
$$
BEGIN
   IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'admin') THEN
      CREATE ROLE admin WITH LOGIN PASSWORD 'admin';
   END IF;
END
$$;

CREATE DATABASE clientDb;
GRANT ALL PRIVILEGES ON DATABASE clientDb TO admin;

DROP DATABASE IF EXISTS clientDb;

CREATE DATABASE clientDb;
ALTER ROLE admin WITH SUPERUSER;

CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  client_id VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  main_language VARCHAR(50) NOT NULL,
  secondary_language VARCHAR(50),
  funding_source VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS funding_sources (
  id SERIAL PRIMARY KEY,
  source_name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO funding_sources (source_name) VALUES
('NDIS'), ('HCP'), ('CHSP'), ('DVA'), ('HACC')
ON CONFLICT (source_name) DO NOTHING;