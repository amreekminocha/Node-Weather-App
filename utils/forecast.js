const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=c57e725d8c17d37c49b4fc8532460b5f&query=" + latitude + "," + longitude + "&units=m";

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to services', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                weather: response.body.current.weather_descriptions,
                temperature: response.body.current.temperature,
                precip: response.body.current.precip
            });
        }
    });
};

module.exports = forecast;