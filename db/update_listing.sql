UPDATE Properties
SET address = $3,
    city = $4,
    state = $5,
    zip = $6,
    img = $7,
    rent = $8,
    title = $9

WHERE property_id = $1 AND user_id = $2;
SELECT * FROM Properties;