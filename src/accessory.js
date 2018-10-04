//
//  accessory.js
//  Sahil Chaddha
//
//  Created by Sahil Chaddha on 04/09/2018.
//  Copyright © 2018 sahilchaddha.com. All rights reserved.
//


const Accessory = class {

  constructor(log, config, homebridge) {
    log('Configuring Homebridge Accessory : ' + this.getModelName())
    this.homebridge = homebridge
    this.log = log
    this.config = config
    this.name = config.name
    this.services = this.getAccessoryServices()
    this.services.push(this.getInformationService())
  }

  getInformationService() {
    var informationService = new this.homebridge.Service.AccessoryInformation()
    informationService
      .setCharacteristic(this.homebridge.Characteristic.Manufacturer, 'Dafang')
      .setCharacteristic(this.homebridge.Characteristic.Model, this.getModelName())
      .setCharacteristic(this.homebridge.Characteristic.SerialNumber, this.getSerialNumber())
    return informationService
  }

  getAccessoryServices() {
    throw new Error('The getSystemServices method must be overridden.')
  }

  getModelName() {
    throw new Error('The getModelName method must be overridden.')
  }

  getSerialNumber() {
    throw new Error('The getSerialNumber method must be overridden.')
  }

  getServices() {
    return this.services
  }
}

module.exports = Accessory
