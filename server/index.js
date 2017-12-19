const express = require('express')
const { json } = require('body-parser')
const session = require('express-session')

require('dotenv').config()

// Controller
const sc = require('./controllers/swag_controller')
const authc = require('./controllers/auth_controller')
const cc = require('./controllers/cart_controller')
const search_controller = require('./controllers/search_controller')

// Middleware
const checkForSession = require('./middlewares/checkForSession')

// Making app and using body-parser
const app = express()
app.use(json())

app.use( express.static( `${__dirname}/build` ) );


// Session
app.use(session({
    secret: 'reallycoolsecret',
    resave: false,
    saveUninitialized: true
}))

app.use(checkForSession)


// Methods
app.get('/api/swag', sc.read)

app.post('/api/login', authc.login)
app.post('/api/register', authc.register)
app.post('/api/signout', authc.signout)
app.get('/api/user', authc.getUser)

app.post('/api/cart', cc.add)
app.post('/api/cart/checkout', cc.checkout)
app.delete('/api/cart', cc.destroy)

app.get('/api/search', search_controller.search)

// Listen app
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})