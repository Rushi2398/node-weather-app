const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 4004

const viewPath = path.join(__dirname, '../templates/views')
const partialsPath  = path.join(__dirname,'../templates/partials')
const publicPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather App',
        name :  'Rushikesh Jalvi'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Rushikesh Jalvi' 
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        helpText : 'HELP TEXT FOR RENDERING',
        title : 'Help',
        name : 'Rushikesh Jalvi'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error,
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error,
                })
            }
            res.send({
                location,
                forecast : forecastData,
                address : req.query.address
            })
        })
    })
    // res.send({
    //     forecast : 'Sunny Its 30 degrees',
    //     location : 'Borivali',
    //     address : req.query.address
    // })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }
    res.send({
        products : []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title : '404',
        name : 'Rushikesh Jalvi',
        errrorMsg : 'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Rushikesh Jalvi',
        errorMsg : 'Page Not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})