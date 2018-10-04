# homebridge-http-is-it-down

[![NPM](https://nodei.co/npm/homebridge-http-is-it-down.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/homebridge-http-is-it-down/)

[![npm](https://img.shields.io/npm/dm/homebridge-http-is-it-down.svg)](https://www.npmjs.com/package/homebridge-http-is-it-down)
[![npm](https://img.shields.io/npm/v/homebridge-http-is-it-down.svg)](https://www.npmjs.com/package/homebridge-http-is-it-down)

Homebridge Plugin to check whether the endpoint is active/inactive. Occupancy Sensor will be set to `Occupancy Detected` whenever the host is down/up.

## Description :

This plugin makes GET request to the endpoint and validates its expected HTTP Status Code. Works like UpTime Robot. The Occupancy sensor will be activated whenever the validation fails.
You can use this helpful plugin to trigger automations whenever your target host/website/server/ip-camera etc. gets down or up.

## Installation : 

```shell
    $ npm install -g homebridge-http-is-it-down
```

## Sample Config : 

```
{
    "accessories": [
        {
            "accessory": "IsItDown",
            "name": "Camera Status",
            "url": "https://192.168.0.186", // Target URL
            "auth": {
                "user": "root",
                "pass": "ismart12"
            },
            "maxTryOuts": 3,
            "interval": 300000, // in ms
            "expectedStatusCode": 200, // Expected HTTP Status Code
            "debug": true
        },
        {
            "accessory": "IsItDown",
            "name": "MyWebsiteIsItDown",
            "url": "http://sahilchaddha.com",
            "maxTryOuts": 3,
            "interval": 1000,
            "expectedStatusCode": 200
        },
                {
            "accessory": "IsItDown",
            "name": "MyWebsiteIsItUP",
            "url": "http://sahilchaddha.com/pingu",
            "maxTryOuts": 3,
            "interval": 1000,
            "expectedStatusCode": 404
        }
    ]
}

```