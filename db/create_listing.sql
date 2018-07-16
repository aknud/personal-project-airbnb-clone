INSERT INTO Properties (user_id, title, address, city, state, zip, img, rent) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
select * from Properties;
