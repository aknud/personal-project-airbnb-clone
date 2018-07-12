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


-- seed data for Properties TABLE
-- insert into Properties (address, city, state, zip, img, rent, user_id) values ('9 Helena Lane', 'Sioux Falls', 'SD', '57188', 'http://dummyimage.com/201x199.jpg/5fa2dd/ffffff', 90, 1);
-- insert into Properties (address, city, state, zip, img, rent, user_id) values ('7838 Schmedeman Hill', 'Los Angeles', 'CA', '90189', 'http://dummyimage.com/197x248.jpg/cc0000/ffffff', 42, 2);
-- insert into Properties (address, city, state, zip, img, rent, user_id) values ('9 Northview Park', 'Detroit', 'MI', '48258', 'http://dummyimage.com/152x152.jpg/cc0000/ffffff', 95, 1);
-- insert into Properties (address, city, state, zip, img, rent, user_id) values ('24010 Tony Circle', 'Long Beach', 'CA', '90831', 'http://dummyimage.com/225x104.jpg/5fa2dd/ffffff', 46, 2);
-- insert into Properties (address, city, state, zip, img, rent, user_id) values ('379 Laurel Circle', 'Albuquerque', 'NM', '87201', 'http://dummyimage.com/232x165.jpg/dddddd/000000', 65, 1);