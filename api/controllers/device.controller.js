const DeviceService = require("../services/device.services");
const errorHandler = require("../utils/errorHandler.utils");


class DeviceController {
  static async registerDevice(req, res) {
    try {
      const device = await DeviceService.registerDevice(req.body);
      return res.status(201).send(device);
    } catch (error) {
      console.log(error);
    }
  }
  
  static async getAllDevices(req, res) {
    try {
      const device = await DeviceService.getAllDevices();
      if (!device) return res.status(404).send(errorHandler(0, device));
      return res.status(200).send(device);
    } catch (error) {
      console.log(error);
    }
  }
  static async getByUserId(req, res) {
    try {
      const devices = await DeviceService.getByUserId(req.params.userid);
      if (devices.length==0) return res.status(404).send(errorHandler(0, devices));
      return res.status(200).send(devices);
    }catch (error) {
      console.log(error);
    }
  }

  static async getDevice(req, res) {
    try {
      const device = await DeviceService.getDevice(req.params.id);
      if (!device) return res.status(404).send(errorHandler(0, device));
      return res.status(200).send(device);
    } catch (error) {
      console.log(error);
    }
  }

  static async pushMeasures(req, res) {
    try {
      const device = await DeviceService.pushMeasures(req.body);
      if (!device) return res.status(404).send(errorHandler(0, device));
      return res.status(200).send(device);
    } catch (error) {
      console.log(error);
    }
  }

  static async getMeasuresByDates(req, res) {
  
    try {
      const measures = await DeviceService.getMeasuresByDates(req.body);
      if (measures.length == 0) return res.status(404).send(errorHandler(0, measures));
      return res.status(200).send(measures);
    } catch (error) {
      console.log(error);
    }
  }

  static async editDevice(req, res) {
    try {
      const device = await DeviceService.editDevice(req.body);
      if (device.modifiedCount > 0) return res.status(200).send(device);
      return device.matchedCount == 0
        ? res.status(404).send(errorHandler(1, device))
        : res.status(400).send(errorHandler(2, device));
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteDevice(req, res) {
    try {
      const device = await DeviceService.deleteDevice(req.params.id);
      return res.status(204).send(device);
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = DeviceController;