const swag = require('./../models/swag')


const add = ( req, res, next ) => {
    const { id } = req.query;
    let { cart } = req.session.user;

    const index = cart.findIndex( swag => swag.id == id );

    if ( index === -1 ) {
      const selectedSwag = swag.find( swag => swag.id == id );

      cart.push( selectedSwag );
      req.session.user.total += selectedSwag.price;
    }
    res.status(200).send(req.session.username)
}

const destroy = (req, res, next) => {
    const { id } = req.query
    const { cart } = req.session.user

    const selectedSwag = swag.find(swag => swag.id === id)
    
    if(selectedSwag) {
        const index = cart.findIndex(swag => swag.id === id)
        cart.splice(index, 1)
        req.session.user.total -= selectedSwag.price
    }
    res.status(200).send(req.session.user)
}

const checkout = (req, res, next) => {
    const { user } = req.session
    user.cart = []
    user.total = 0

    res.status(200).send(req.session.user)
}

module.exports = {
    add,
    destroy,
    checkout
}