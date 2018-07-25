module.exports = {
	create: (req, res) => {
		const dbi = req.app.get('db');
		const { address, city, state, zip, url, rent, title } = req.body;
		dbi
			.create_listing([ req.session.user.user_id, title, address, city, state, zip, rent ])
			.then((listing) => {
				const { property_id } = listing[0];
				dbi.add_photo([ +property_id, url ]).then((listings) => res.status(200).send(listings)).catch((err) => {
					res.status(500).send({ errorMessage: 'This is why we cant have nice things.' });
					console.log(err);
				});
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'This is why we cant have nice things.' });
				console.log(err);
			});
	},
	getAllListings: (req, res) => {
		const dbi = req.app.get('db');
		dbi.get_listings().then((listings) => res.status(200).send(listings)).catch((err) => {
			res.status(500).send({ errorMessage: `Something is broken.` });
			console.log(err);
		});
	},
	getListings: (req, res) => {
		const dbi = req.app.get('db');

		dbi.get_All_Listings().then((listings) => res.status(200).send(listings)).catch((err) => {
			res.status(500).send({ errorMessage: `Something is broken.` });
			console.log(err);
		});
	},
	getPhotos: (req, res) => {
		const dbi = req.app.get('db');
		const {id} = req.params;
		dbi.photos_By_Id([+id]).then((photos) => res.status(200).send(photos)).catch((err) => {
			res.status(500).send({ errorMessage: `Something is broken.` });
			console.log(err);
		});
	},
	
	getHostListings: (req, res) => {
		const dbi = req.app.get('db');
		dbi
			.get_host_listings([ req.session.user.user_id ])
			.then((listings) => {
				res.status(200).send(listings)
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: `Something is broken.` });
				console.log(err);
			});
	},
	getAllUserData: (req, res) => {
		const dbi = req.app.get('db');
		dbi.get_all_user_data().then((userData) => res.status(200).send(userData)).catch((err) => {
			res.status(500).send({ errorMessage: `Something went wrong.` });
			console.log(err);
		});
	},
	update: (req, res) => {
		const dbi = req.app.get('db');
		const { id } = req.params;
		const { user_id } = req.session.user;
		const { address, city, state, zip, url, rent, title } = req.body;
		dbi.update_listing([ +id, user_id, address, city, state, zip, rent, title, url ])
			.then((allListings) => {
				let reducedListings = []
				allListings.forEach( (listing) => {
					if(reducedListings.findIndex( list => list.property_id === listing.property_id) === -1) {
						const { property_id, address, city, state, zip, rent, title, user_id } = listing
						
						const photos = allListings.filter( property => property.property_id === listing.property_id && property.url != null).map( property => property.url)

						reducedListings.push({
							property_id, address, city, state, zip, rent, title, user_id, photos
						})
					}
				})
				res.status(200).send(reducedListings)
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'This is why we cant have nice things.' });
				console.log(err);
			});
	},
	delete: (req, res) => {
		const dbi = req.app.get('db');
		const { id } = req.params;
		dbi.delete_listing(id).then((listings) => res.send(listings)).catch((err) => {
			res.status(500).send({ errorMessage: 'This is why we cant have nice things.' });
			console.log(err);
		});
	},
	checkForLogin: (req, res) => {
		if (req.session.user) {
			res.status(200).send(req.session.user);
		} else {
			res.redirect('http://localhost:3000/login');
		}
	}
};
