module.exports = {
	create: (req, res) => {
		const dbi = req.app.get('db');
		const { address, city, state, zip, url, rent, title } = req.body;
		dbi
			.create_listing([ req.session.user.user_id, title, address, city, state, zip, rent, url ])
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
	saveListing: (req, res) => {
		const dbi = req.app.get('db');
		const { id: property_id } = req.params;
		const {host_id} = req.body;
		dbi
			.add_saved_listing([ +host_id, +req.session.user.user_id, +property_id ])
			.then((listingInfo) => res.status(200).send(listingInfo))
			.catch((err) => {
				res.status(500).send({ errorMessage: 'This is why we cant have nice things.' });
				console.log(err);
			});
	},
	getSavedListings: (req, res) => {
		const dbi = req.app.get('db');
		dbi.get_saved_listings().then((listings) => res.status(200).send(listings)).catch((err) => {
			res.status(500).send({ errorMessage: `Something is broken.` });
			console.log(err);
		});
	},
	getAllListings: (req, res) => {
		const dbi = req.app.get('db');
		dbi.get_all_listings().then((listings) => res.status(200).send(listings)).catch((err) => {
			res.status(500).send({ errorMessage: `Something is broken.` });
			console.log(err);
		});
	},
	getPhotosById: (req, res) => {
		const dbi = req.app.get('db');
		const { id } = req.params;
		dbi.photos_by_id([ +id ]).then((photos) => res.status(200).send(photos)).catch((err) => {
			res.status(500).send({ errorMessage: `Something is broken.` });
			console.log(err);
		});
	},
	getPhotos: (req, res) => {
		const dbi = req.app.get('db');
		dbi.get_all_photos().then((photos) => res.status(200).send(photos)).catch((err) => {
			res.status(500).send({ errorMessage: `Something is broken.` });
			console.log(err);
		});
	},

	getHostListings: (req, res) => {
		const dbi = req.app.get('db');
		dbi
			.get_host_listings([ req.session.user.user_id ])
			.then((listings) => {
				res.status(200).send(listings);
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
		const { address, city, state, zip, rent, title } = req.body;
		dbi
			.update_listing([ +id, user_id, address, city, state, zip, rent, title ])
			.then((allListings) => {
				res.status(200).send(allListings);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'This is why we cant have nice things.' });
				console.log(err);
			});
	},

	addPhoto: (req, res) => {
		const { id: property_id } = req.params;
		const { url } = req.body;
		req.app
			.get('db')
			.add_photo([ property_id, url ])
			.then((photos) => {
				return res.send(photos);
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).send(err);
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
	deletePhoto: (req, res) => {
		const dbi = req.app.get('db');
		const { id } = req.params;
		dbi
			.delete_photo([ +id ])
			.then((photos) => {
				res.send(photos);
			})
			.catch((err) => {
				res.status(500).send({ errorMessage: 'This is why we cant have nice things.' });
				console.log(err);
			});
	}
	// checkForLogin: (req, res) => {
	// 	if (req.session.user) {
	// 		res.status(200).send(req.session.user);
	// 	} else {
	// 		res.redirect(`${process.env.FRONTEND_DOMAIN}/login`);
	// 	}
	// }
};
