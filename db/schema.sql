CREATE TABLE Users (
    user_id serial PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    city VARCHAR(80),
    state VARCHAR(2),
    zip INTEGER,
    phone VARCHAR(24),
    email VARCHAR(100) UNIQUE NOT NULL,
    auth_id TEXT,
    user_pic TEXT
);

CREATE TABLE Properties (
    property_id serial PRIMARY KEY,
    address VARCHAR(100),
    city VARCHAR(80),
    state VARCHAR(2),
    zip INTEGER,
    img TEXT,
    rent DECIMAL,
    user_id INTEGER REFERENCES Users (user_id)
);