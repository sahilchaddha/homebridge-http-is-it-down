//
//  httpPlugin.js
//  Sahil Chaddha
//
//  Created by Sahil Chaddha on 04/09/2018.
//  Copyright © 2018 sahilchaddha.com. All rights reserved.
//

const request = require('request')
const Accessory = require('./accessory')

const pluginName = 'homebridge-http-is-it-down'
const accessoryName = 'IsItDown'
var homebridge

function HTTPPluginGlobals() {

}

HTTPPluginGlobals.setHomebridge = (homebridgeRef) => {
  homebridge = homebridgeRef
}

class HTTPPlugin extends Accessory {
  constructor(log, config = {}) {
    super(log, config, homebridge)
    this.config = config
    this.isOn = false
    this.tryOuts = 0
    this.maxTryOuts = this.config.maxTryOuts || 3
    this.intervalTime = this.config.interval || 300000
    this.expectedCode = this.config.expectedStatusCode || 200
    const self = this
    setTimeout(() => {
      self.pingEndpoint()
    }, this.intervalTime)
  }

  getModelName() {
    return 'HTTP-IS-IT-DOWN'
  }

  getSerialNumber() {
    return '001-ISITDOWN'
  }

  getAccessoryServices() {
    const occupancySensor = new this.homebridge.Service.OccupancySensor(this.config.name)
    occupancySensor
      .getCharacteristic(this.homebridge.Characteristic.OccupancyDetected)
      .on('get', this.getState.bind(this))
    return [occupancySensor]
  }

  getState(callback) {
    callback(null, this.encodeState(this.isOn))
  }

  updateState(res) {
    this.isOn = res
    this.services[0]
      .getCharacteristic(this.homebridge.Characteristic.OccupancyDetected)
      .updateValue(this.encodeState(res))
  }

  encodeState(state) {
    if (state) {
      return this.homebridge.Characteristic.OccupancyDetected.OCCUPANCY_DETECTED
    }
    return this.homebridge.Characteristic.OccupancyDetected.OCCUPANCY_NOT_DETECTED
  }

  pingEndpoint() {
    var options = {}
    if (this.config.auth) {
      options = {
        auth: {
          user: this.config.auth.user,
          pass: this.config.auth.pass,
        },
      }
    }
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
    const self = this
    request.get(this.config.url, options, (error, response) => {
      var isDeviceAvailable = false
      if (error) {
        this.tryOuts = this.tryOuts + 1
      } else if (response != null) {
        if (response.statusCode === self.expectedCode) {
          this.tryOuts = 0
          isDeviceAvailable = true
        } else {
          this.tryOuts = this.tryOuts + 1
        }
      }
      if (isDeviceAvailable) {
        self.logMessage('Device Available')
        self.updateState(false)
      } else if (this.tryOuts >= this.maxTryOuts) {
        self.logMessage('Device Unavailable. Setting sensor to true')
        self.updateState(true)
      } else {
        self.logMessage('Device Unavailable. Retrying : ' + self.tryOuts)
      }
      // Re Ping
      setTimeout(() => {
        self.pingEndpoint()
      }, self.intervalTime)
    })
  }

  logMessage(message) {
    if (this.config.debug) {
      this.log(message)
    }
  }
}

module.exports = {
  accessory: HTTPPlugin,
  globals: HTTPPluginGlobals,
  pluginName: pluginName,
  accessoryName: accessoryName,
}
