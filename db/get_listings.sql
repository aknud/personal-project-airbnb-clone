-- SELECT * FROM Properties;

-- need pictures from photos table

SELECT p.photo_id, p.url, pr.property_id, pr.img ,pr.address, pr.city, pr.state, pr.zip, pr.rent, pr.title, pr.user_id FROM Photos p
 RIGHT JOIN Properties pr
    ON p.property_id = pr.property_id;


    --I think I can delete this file. 
    --Keeping it around until most the bugs are worked out.