const Measure = require("../models/Measures");
const Device = require("../models/Devices");
const Users = require("../models/Users");

class MeasureService {
    static async seedDb(body) {
        try {
            const measure = await Measure.insertMany(body);
            const device = await Device.updateOne({ qrCode: measure[0].devEUI }, { $push: { measures: measure } });
            return measure;
        } catch (error) {
            console.error(error);
        }
    }
    static async create(body) {
        try {
            const measure = new Measure(body);
            return await measure.save();
        } catch (error) {
            console.error(error);
        }
    }
    static async getAllMeasures(entries, user) {
        try {
            // trae lista de devices
            const userA = await Users.find({ _id: user }, { devices: 1 });

            const results = await Promise.all(
                userA[0].devices.map(async (device) => {
                    console.log("device: ", device)
                    return await Measure.find({ "DevEUI_uplink.DevEUI":  device  })
                        .sort({ $natural: -1 })
                        .limit(entries || 0);
                })
            );
            return results.reverse();
        } catch (error) {
            console.error(error);
        }
}

module.exports = MeasureService;
