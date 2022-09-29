const Measure = require("../models/Measures");
const Device = require("../models/Devices");

class MeasureService {
  static async seedDb(body) {
    body = body.map((e)=> {e.createdAt = new Date (e.createdAt)
    return e})
    try {
      const measure = await Measure.insertMany(body);
      const device =  await Device.updateOne(
        {qrCode:measure[0].devEUI},
       {$push:{measures:measure}});
      return measure
    } catch (error) {
      console.error(error);
    }
  }
  static async create(body) {
    try {
      const measure = new Measure(body)
      return await measure.save();
    } catch (error) {
      console.error(error);
    }
  }
  static async getAllMeasures(body) {
    try {
      return await Measure.find();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = MeasureService;
