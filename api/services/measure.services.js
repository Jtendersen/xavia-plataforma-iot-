const Measure = require("../models/Measures");
const Device = require("../models/Devices");

class MeasureService {
    static async seedDb(body) {
        try {
            const measure = await Measure.insertMany(body);
            const device = await Device.updateOne(
                { qrCode: measure[0].devEUI },
                { $push: { measures: measure } }
            );
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
    static async getAllMeasures(devEUI, entries) {
        try {
            if (entries) {
                const results = await Measure.find({devEUI}).sort({ $natural: -1 }).limit(entries)
                return results.reverse()
            } else {
                return await Measure.find({devEUI});
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = MeasureService;
