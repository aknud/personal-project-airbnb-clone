
DELETE FROM Photos
WHERE property_id = $1;
DELETE FROM Properties
WHERE property_id = $1;

-- select * from Properties;

SELECT p.photo_id, p.url, pr.property_id, pr.address, pr.city, pr.state, pr.zip, pr.rent, pr.title, pr.user_id, pr.img 
FROM Photos p
 RIGHT JOIN Properties pr
    ON p.property_id = pr.property_id;