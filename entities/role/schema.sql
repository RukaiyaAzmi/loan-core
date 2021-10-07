DROP SCHEMA IF EXISTS role_schema CASCADE;

CREATE SCHEMA role_schema;

CREATE TABLE role_schema.feature(
	id SERIAL PRIMARY KEY NOT NULL,
	feature_name TEXT UNIQUE NOT NULL,
	feature_name_ban TEXT NOT NULL,
	feature_code TEXT UNIQUE NOT NULL,
	url TEXT NOT NULL,
	type TEXT NOT NULL,
	position TEXT NOT NULL,
	icon_id INT,
	parent_id INT,
	is_active TEXT NOT NULL,
	created_by TEXT NOT NULL,
	create_date timestamptz NOT NULL DEFAULT NOW(),
	updated_by TEXT NOT NULL,
	update_date timestamptz NOT NULL DEFAULT NOW(),
	FOREIGN KEY(parent_id) REFERENCES role_schema.feature(id)
);

CREATE TABLE role_schema.role(
	id SERIAL PRIMARY KEY NOT NULL,
	role_name TEXT NOT NULL,
	description TEXT NOT NULL,
	status TEXT NOT NULL,
	is_active TEXT NOT NULL,
	office_id INT,
	approved_by TEXT NOT NULL,
	approve_date timestamptz,
	created_by TEXT NOT NULL,
	create_date timestamptz NOT NULL DEFAULT NOW(),
	updated_by TEXT NOT NULL,
	update_date timestamptz NOT NULL DEFAULT NOW(),
	CONSTRAINT role_unique_key UNIQUE(role_name, office_id)
);

CREATE TABLE role_schema.role_feature(
	id SERIAL PRIMARY KEY NOT NULL,
	role_id INT NOT NULL,
	feature_id INT NOT NULL,
	FOREIGN KEY(role_id) REFERENCES role_schema.role(id),
	FOREIGN KEY(feature_id) REFERENCES role_schema.feature(id)
);
