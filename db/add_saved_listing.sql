INSERT INTO savedListing (user_id, property_id)
VALUES ($1, $2);

SELECT 
    pr.property_id, 
    pr.img, pr.address, 
    pr.city, pr.state, 
    pr.zip, pr.rent, 
    pr.title, 
    pr.user_id  
        FROM properties pr
        RIGHT JOIN savedListing s
        ON pr.property_id = s.property_id;

