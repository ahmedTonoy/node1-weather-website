const request = require('request')

const weather = (lat, lon, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + encodeURI(lat) + '&lon=' + encodeURI(lon) + '&units=metric&APPID=d31120d44e699c0ee3a23a32f0a31b00'
    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to the weather server!', undefined)
        } else if(body.cod === '404') {
            callback('Location not found! Please try correct location!', undefined)
        } else {
            callback(undefined, {
                location: body.name,
                temperature: body.main.temp,
                skyCondition: body.weather[0].description
            })
        }
    })
}

module.exports = weather