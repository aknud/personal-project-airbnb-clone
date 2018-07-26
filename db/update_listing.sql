UPDATE Properties
SET address = $3,
    city = $4,
    state = $5,
    zip = $6,
    rent = $7,
    title = $8
WHERE property_id = $1 AND user_id = $2;

SELECT * FROM Properties;

-- SELECT p.photo_id, p.url, pr.property_id, pr.img ,pr.address, pr.city, pr.state, pr.zip, pr.rent, pr.title, pr.user_id FROM Photos p
--  RIGHT JOIN Properties pr
--     ON p.property_id = pr.property_id;