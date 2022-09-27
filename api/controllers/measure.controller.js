const MeasureService = require("../services/measure.services");

class MeasureController {
    static async seedDb(req, res) {
        try {
            const measure = await MeasureService.seedDb(req.body);
            return res.status(201).send(measure);
        } catch (error) {
            console.log(error);
        }
    }
    static async create(req, res) {
        try {
            const measure = await MeasureService.create(req.body);
            return res.status(201).send(measure);
        } catch (error) {
            console.log(error);
        }
    }
    static async getAllMeasures(req, res) {
        try { 
            const measure = await MeasureService.getAllMeasures(
                req.query.entries,
                req.query.user
            );
            return res.status(200).send(measure);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MeasureController;
