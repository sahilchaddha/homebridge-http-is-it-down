//
//  index.js
//  Sahil Chaddha
//
//  Created by Sahil Chaddha on 13/08/2018.
//  Copyright © 2018 sahilchaddha.com. All rights reserved.
//

const HTTPPlugin = require('./src/httpPlugin')

module.exports = (homebridge) => {
  var homebridgeGlobals = {
    Service: homebridge.hap.Service,
    Characteristic: homebridge.hap.Characteristic,
    Accessory: homebridge.platformAccessory,
    UUIDGen: homebridge.hap.uuid,
    Categories: homebridge.hap.Accessory.Categories,
    StreamController: homebridge.hap.StreamController,
    User: homebridge.user,
  }
  HTTPPlugin.globals.setHomebridge(homebridgeGlobals)
  homebridge.registerAccessory(HTTPPlugin.pluginName, HTTPPlugin.accessoryName, HTTPPlugin.accessory, true);
}
