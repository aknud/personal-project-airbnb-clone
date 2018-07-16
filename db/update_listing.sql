UPDATE Properties
SET address = $2,
    city = $3,
    state = $4,
    zip = $5,
    img = $6,
    rent = $7,
    title = $8

WHERE user_id = $1;