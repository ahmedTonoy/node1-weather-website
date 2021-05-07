const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiZm9ya2FuMTUxMDY5OSIsImEiOiJja21sdGp2b3UxZWw0MnVzN2lrcWtiMGlxIn0.4ekLt0Idsoknh1C6CuwCKw&limit=1'
    request({ url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to location server!', undefined)
        } else if(body.features.length === 0) {
            callback('Location not found! Please try correct location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
} 

module.exports = geocode