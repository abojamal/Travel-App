// for working with file and directory paths
const path = require('path');
// Require Express to run server and routes
const express = require('express');
//To use fetch API
const fetch = require('node-fetch');
//To allow the use of environment variables
const dotenv = require('dotenv');
dotenv.config();
// Start up an instance of app
const app = express();
//configuring express to use body-parser as middle-ware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));
// get data route
app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log(' listening on port 8081!');
});
// Setup empty JS object to act as endpoint for all routes
const projectData = {};

//refering API_KEY to the environment variable
const Geonames_KEY = process.env.Geonames_KEY;
const Weatherbit_KEY = process.env.Weatherbit_KEY;
const Pixabay_KEY = process.env.Pixabay_KEY;

//POST route
app.post('/api', (req, res) => {
  //Acquiring user submitted text
  projectData.date = req.body.date;
  projectData.city = req.body.city;
  projectData.dateDiff = req.body.dateDiff;

  // Sending API requests
  const getApis = async () => {
    try {
      const firstResponse = await fetch(
        `http://api.geonames.org/searchJSON?q=${projectData.city}&maxRows=1&username=${Geonames_KEY}`
      );
      const position = await firstResponse.json();
      const lat = position.geonames[0].lat;
      const lng = position.geonames[0].lng;

      const secondResponse = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${Weatherbit_KEY}`
      );
      const weatherData = await secondResponse.json();
      const weatherHigh = weatherData.data[projectData.dateDiff].low_temp;
      const weatherLow = weatherData.data[projectData.dateDiff].max_temp;
      const description =
        weatherData.data[projectData.dateDiff].weather.description;

      //adding requested weather info to project data Obj
      projectData.weatherHigh = weatherHigh;
      projectData.weatherLow = weatherLow;
      projectData.description = description;
      const thirdResponse = await fetch(
        `https://pixabay.com/api/?key=${Pixabay_KEY}&q=${projectData.city}&category=places&image_type=photo`
      );
      const cityImage = await thirdResponse.json();
      projectData.cityImage = cityImage.hits[0].webformatURL;
      res.send(projectData);
    } catch (error) {
      console.log(`there was as error:\n ${error}`);
    }
  };
  getApis();
});

// export { app };
