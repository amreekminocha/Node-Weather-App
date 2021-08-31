const express = require('express');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send({
        URL: "https://amreek-weather-app.herokuapp.com/weather?address=Delhi"
    })
});

app.get('/weather', (req, res) => {
    const address = req.query.address;

    geocode(address, (error, data) => {
        if (error) {
            return console.log(error);
        }
        // console.log(data.place_name);
        forecast(data.latitude, data.longitude, (error, foreCastData) => {
            if (error) {
                return console.log(error);
            }
            res.send({
                Location: data.place_name,
                Forecast: foreCastData.weather + ". It is currently " + foreCastData.temperature + " degree Celcius out ",
                Precipitation: "There is a " + foreCastData.precip + "% chance of precipitation"
            });
            // console.log(foreCastData.weather + ". It is currently " + foreCastData.temperature + " degree Celcius out ");
            // console.log("There is a " + foreCastData.precip + "% chance of precipitation");

        });

    });

});

app.listen(port, () => {
    console.log("Listening in " + port);
});