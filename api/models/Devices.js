const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema(
  {
    qrCode: {
      type: String,
      required : true,
      unique: true,
    },
    typeOfDevice: {
      type: String,
    },
    gatewayLora:{
      type:String,
    },
    measuresAmount:{
      type:String,
    },
    typeOfTracking:{
      type:String,
    },
    users: {
      type: String,
      required : true,
    },
    userId:{
      type: String,
    },
    measures: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Devices", DeviceSchema);
