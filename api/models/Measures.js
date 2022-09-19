const mongoose = require("mongoose");

const MeasuresSchema = new mongoose.Schema(
    {
        devEUI: {
            type: String,
        },
        messageType: {
            type: String,
        },
        trackingMode: {
            type: String,
        },
        batteryVoltage: {
            type: Number,
        },
        ackToken: {
            type: Number,
        },
        firmwareVersion: {
            type: String,
        },
        resetCause: {
            type: Number,
        },
        periodicPosition: {
            type: Boolean
        },
        temperatureMeasure: {
            type: Number,
        },
        sosFlag: {
            type: Number,
        },
        appState: {
            type: Number,
        },
        dynamicMotionState: {
            type: String,
        },
        onDemand: {
            type: Boolean,
        },
        payload: {
            type: Array,
        },
        deviceConfiguration: {
            type: Object,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Measures", MeasuresSchema);
