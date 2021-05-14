const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

// Initialising Express
const app = express()

const port = process.env.PORT || 3000

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


// Define route handlers
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Forkan Uddin Ahmed'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Forkan Uddin Ahmed'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is help message!",
        title: 'Help',
        name: 'Forkan Uddin Ahmed'
    })
})

app.get(('/weather'), (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please give a valid address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        weather(latitude, longitude, (error, {temperature, skyCondition}) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                location,
                skyCondition,
                temperature
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: 404,
        name: 'Forkan Uddin Ahmed',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: 404,
        name: 'Forkan Uddin Ahmed',
        errorMessage: 'Error 404 not found!'
    })
})

// Setup port to serve up the server
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})