DROP SCHEMA IF EXISTS role CASCADE;

CREATE SCHEMA role;

-- feature table for feature listing
CREATE TABLE role.feature(
    id SERIAL PRIMARY KEY NOT NULL,
    feature_name TEXT UNIQUE NOT NULL,
    feature_name_ban TEXT NOT NULL,
    feature_code TEXT UNIQUE NOT NULL,
    url TEXT NOT NULL,
    -- root node or not
    is_root BOOLEAN NOT NULL,
    -- Parent = P, Child = C
    type TEXT NOT NULL,
    -- Sidebar = SIDE, Navbar = NAV, Content = CONT
    position TEXT NOT NULL,
    icon_id TEXT,
    parent_id INT CHECK(parent_id <> id),
    is_active BOOLEAN NOT NULL,
    created_by TEXT NOT NULL,
    create_date timestamptz NOT NULL DEFAULT NOW(),
    updated_by TEXT,
    update_date timestamptz,
    FOREIGN KEY(parent_id) REFERENCES role.feature(id)
);

-- role table 
CREATE TABLE role.role(
    id SERIAL PRIMARY KEY NOT NULL,
    role_name TEXT NOT NULL,
    description TEXT NOT NULL,
    -- Active = A, Pending = P, Rejected = R
    approve_status TEXT DEFAULT 'P' NOT NULL,
    -- Is operational or not
    is_active BOOLEAN NOT NULL,
    office_id INT NOT NULL REFERENCES master.office_info(id) ON DELETE CASCADE,
    approved_by TEXT,
    approve_date timestamptz,
    created_by TEXT NOT NULL,
    create_date timestamptz NOT NULL DEFAULT NOW(),
    updated_by TEXT,
    update_date timestamptz,
    CONSTRAINT role_unique_key UNIQUE(role_name, office_id)
);

-- role and feature many to many relation table
CREATE TABLE role.role_feature(
    id SERIAL PRIMARY KEY NOT NULL,
    role_id INT NOT NULL,
    feature_id INT NOT NULL,
    FOREIGN KEY(role_id) REFERENCES role.role(id),
    FOREIGN KEY(feature_id) REFERENCES role.feature(id)
);