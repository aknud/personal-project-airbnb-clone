module.exports = {
    getAllListings: (req, res) => {
        const dbi = req.app.get('db');
        dbi.get_listings().then(listings => res.status(200).send(listings))
        .catch(err => {
            res.status(500).send({errorMessage: `Something is broken.`})
            console.log(err)
        })
    },
    getHostListings: (req, res) => {
        const dbi = req.app.get('db');
        dbi.get_host_listings([req.session.user.user_id]).then(listings => res.status(200).send(listings))
        .catch(err => {
            res.status(500).send({errorMessage: `Something is broken.`})
            console.log(err)
        })
    }
}