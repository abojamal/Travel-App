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
// const API_KEY = process.env.API_KEY;
// POST route
// app.post('/api', function (req, res) {
//Acquiring user submitted text
//   let text = req.body.txt;

//Sending API request to meaningcloud with key and user acquired text
//   fetch(
//     `https://api.meaningcloud.com/sentiment-2.1?key=${API_KEY}&lang=en&txt=${text}&model=general`
//   )
//return the body as promise with json content
// .then((data) => data.json())
//storing the needed API response info into the endpoint
// .then((data) => {
//   projectData.agreement = data.agreement;
//   projectData.subjectivity = data.subjectivity;
//send the stored data in endpoint back to client
//       res.send(projectData);
//     })
//     .catch((error) => {
//       console.log('Error');
//     });
// });
