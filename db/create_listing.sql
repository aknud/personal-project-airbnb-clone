INSERT INTO Properties (user_id, title, address, city, state, zip, rent) 
VALUES ($1, $2, $3, $4, $5, $6, $7)
returning *;
