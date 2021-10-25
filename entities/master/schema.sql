DROP SCHEMA IF EXISTS master CASCADE;

CREATE SCHEMA master;

CREATE TABLE master.office_info (
    id SERIAL PRIMARY KEY NOT NULL,
    office_name TEXT UNIQUE NOT NULL,
    doptor_office_id INT UNIQUE NOT NULL,
    ministry_id INT NOT NULL,
    -- Field will be added here
    
    created_by TEXT NOT NULL,
    create_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by TEXT,
    update_date TIMESTAMPTZ
)