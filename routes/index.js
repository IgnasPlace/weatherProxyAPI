const url = require('url')
const express = require("express");
const router = express.Router();
const needle = require("needle");
const apicache =require('apicache');

// Env var
const WEATHER_BASE_URL = process.env.API_BASE_URL;
const WEATHER_KEY_NAME = process.env.API_KEY_NAME;
const WEATHER_KEY_VALUE = process.env.API_KEY_VALUE;
const GEO_BASE_URL = process.env.GEO_BASE_URL;
const GEO_KEY_NAME = process.env.GEO_KEY_NAME;
const GEO_KEY_VALUE = process.env.GEO_KEY_VALUE;

// Init cache
let cache = apicache.middleware

router.get('/', async (req,res) => {
    res.send('welcome to IgnasPlace Weather proxy API');
  })

router.get('/getLocation', cache('2 minutes'), async (req, res) => {
  if(Object.keys(req.query).length === 0) {
    res.send('wrong params')
  }

  try {
    const response = await fetch(
      `${GEO_BASE_URL}?text=${req.query.keyWord}&limit=7&lang=en&format=json&${GEO_KEY_NAME}=${GEO_KEY_VALUE}`
    );
    const data = await response.json();
    if (!data.error) {
      res.json(data);
    } else {
      alert('Having problems receiving data. Error: ' + data.message + ': ')
      throw Error(data.statusCode + ". " + data.error + ". " + data.message)
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/getWeather', cache('2 minutes'), async (req, res) => {
  // console.log("FETCHING WEATHER DATA");
  if(Object.keys(req.query).length < 3) {
    res.send('wrong params')
  }

  const params = new URLSearchParams({
    [WEATHER_KEY_NAME]: WEATHER_KEY_VALUE,
    ...url.parse(req.url, true).query
})
  try {
    const response = await fetch(
      `${WEATHER_BASE_URL}?${params}`
    );
    const data = await response.json();
    if (!data.error) {
      res.json(data);
    } else {
      alert('Having problems receiving data. Error: ' + data.message + ': ')
      throw Error(data.statusCode + ". " + data.error + ". " + data.message)
    }
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
