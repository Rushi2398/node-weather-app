const request =  require('postman-request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=1ebe0dbcd1924321ca64ab893cdb96e3&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    request({ url, json : true},(error,{body}) =>{
        if(error){
            callback('Unable to connect weather service', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else{
            const data = body.current
            callback(undefined, data.weather_descriptions[0]+'. It is currently '+data.temperature+ ' degrees out. It feels like '+data.feelslike+ ' out.')
        }
    })
}

module.exports = forecast