-- SELECT * FROM Users u, Properties p
-- WHERE u.user_id = p.user_id;

SELECT u.user_id, u.first_name, u.last_name, u.email, u.user_pic, 
p.title, p.address, p.city, p.state, p.zip, p.rent, p.property_id, p.img
FROM Users u, properties p
WHERE u.user_id = p.user_id;