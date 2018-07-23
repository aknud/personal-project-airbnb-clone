-- SELECT * FROM Properties
-- WHERE user_id = $1;

SELECT p.photo_id, p.url, pr.property_id, pr.img ,pr.address, pr.city, pr.state, pr.zip, pr.rent, pr.title, pr.user_id FROM Photos p
 RIGHT JOIN Properties pr
    ON p.property_id = pr.property_id;