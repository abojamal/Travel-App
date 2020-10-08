# Travel App

## Overview

In this project , I have build out a travel app that asks the user to input the location,travel and return date then return weather forcast ,image of the location, days remaining and trip length by using information obtained from external APIs.

## Prerequite

-getting API keys from Geonames,Weatherbit and Pixabay

## Installation

- node
- expess (refer to json file for Dependencies)
- webpack

## notes

- I chose " add end date and display length of trip" as the additional requirement

-Please uncomment export {app} from server.js file to test server with jest

- weather forecast is for 16 days maximum, any date after that will have the same result as day 16 . This limitation is due to not having a paid account in Weatherbit

- input validation not included
