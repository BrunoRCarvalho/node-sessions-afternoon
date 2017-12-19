const swag = require('./../models/swag')

const search = (req, res, next) => {
    const { category } = req.query
    if(!category) {
        res.status(200).send(swag)
    } else {
        const chosenCategory = swag.filter(swag => swag.category === category)
        res.status(200).send(chosenCategory)
    }
}

module.exports = {
    search
}