SELECT * FROM photos
WHERE property_id = $1;


--NOTE: I dont think I need this sql file anymore. It was being used in SelectedListing.js but I instead put all the photos on the store and filtered out the photos by property id.