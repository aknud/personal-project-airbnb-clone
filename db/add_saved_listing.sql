INSERT INTO savedListing (user_id, property_id)
VALUES ($1, $2)
returning *;
