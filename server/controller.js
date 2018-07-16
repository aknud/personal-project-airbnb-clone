module.exports = {
    create: (req, res) => {
        const dbi = req.app.get('db');
        const { address, city, state, zip, img, rent, title } = req.body
        dbi.create_listing([ req.session.user.user_id, title, address, city, state, zip, img, rent])
            .then(listing => {
                res.status(200).send(listing)
            })
            .catch(err => {
                res.status(500).send({ errorMessage: 'This is why we cant have nice things.' })
                console.log(err)
            })
    },
    getAllListings: (req, res) => {
        const dbi = req.app.get('db');
        dbi.get_listings().then(listings => res.status(200).send(listings))
            .catch(err => {
                res.status(500).send({ errorMessage: `Something is broken.` })
                console.log(err)
            })
    },
    getHostListings: (req, res) => {
        const dbi = req.app.get('db');
        dbi.get_host_listings([req.session.user.user_id]).then(listings => res.status(200).send(listings))
            .catch(err => {
                res.status(500).send({ errorMessage: `Something is broken.` })
                console.log(err)
            })
    },
    update: (req, res) => {
        const dbi = req.app.get('db');
        const { id } = req.session.user.user_id;
        const { address, city, state, zip, img, rent, title } = req.body;
        dbi.update_listing([id, address, city, state, zip, img, rent, title])
            .then(() => res.sendStatus(200))
            .catch(err => {
                res.status(500).send({ errorMessage: 'This is why we cant have nice things.' })
                console.log(err)
            })
    },
    delete: (req, res) => {
        const dbi = req.app.get('db');
        const { id } = req.params;
        dbi.delete_listing(id)
            .then((listings) => res.send(listings))
            .catch(err => {
                res.status(500).send({ errorMessage: 'This is why we cant have nice things.' })
                console.log(err)
            })
    }
}