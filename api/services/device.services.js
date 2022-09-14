const ObjectId = require('mongodb').ObjectId
const Device = require("../models/Devices");


class DeviceService {
  static async registerDevice({
    qrCode,
    typeOfDevice,
    gatewayLora,
    measuresAmount,
    typeOfTracking,
    users,
    measures,
  }) {
    try {
        const isRegistered = await Device.findOne({ qrCode: qrCode });

      // Verifica que exista un dispositivo en la db con el mismo qr.
      if (isRegistered) return "Este dispositivo ya esta registrado"
      
      const device = new Device(
        {
          qrCode,
          typeOfDevice,
          gatewayLora,
          measuresAmount,
          typeOfTracking,
          users,
          measures,
        }
      );
      
      return await device.save();
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllDevices({users}) {
    try {
        return await Device.find({users:users}).sort({ qrCode: 1 })

        } catch (error) {
      console.log(error);
    }
  }
static async getDevice(id) {
    try {
      return await Device.findOne({ _id: id });
    } catch (error) {
      
    }
  }
  static async pushMeasures(body) {
    const date = new Date (body.createdAt)
    body.createdAt = date
    
    try {
      return await Device.updateOne(
        {_id:body._id},
       {$push:{measures:body}});
    } catch (error) {
      console.log(error);
    }
  }

  static async getMeasuresByDates(body) {
  
    try {
        const device = await Device.find(
          {_id:body._id})
        if (!device) return []

     const measures = await Device.aggregate([
      {$match:{_id:ObjectId(body._id)}},
      {$unwind:'$measures'},
      {$match:{'measures.createdAt': {$gte:new Date(body.from)}}},
      {$match:{'measures.createdAt': {$lt:new Date(body.to)}}},
      {$group:{_id:'$_id', measures: {$push:'$measures.createdAt'}}}
    ])
      
      if(measures) return measures
    } catch (error) {
        console.log(error)
    }
}  

  static async editDevice(body) {
    
    try {
      return await Device.updateOne(
        {_id:body._id},
       {$set:body});
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteDevice(id) {
    try {
      return await Device.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = DeviceService;