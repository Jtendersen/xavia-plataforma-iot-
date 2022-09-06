const mongoose = require("mongoose");

const DevicesSchema = new mongoose.Schema(
  {
    qrCode: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    users: {
      type: Array,
    },
    medidas: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Devices", DevicesSchema);
