module.exports = {
    read: (req, res) => {
        const dbi = req.app.get('db');
        dbi.get_listings().then(listings => res.status(200).send(listings))
        .catch(err => {
            res.status(500).send({errorMessage: `Something is broken.`})
            console.log(err)
        })
    },
}