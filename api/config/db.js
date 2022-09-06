const mongoose = require('mongoose')
require('dotenv').config()

const db = mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('db connected'))
    .catch((err) => console.error(err))

module.exports = db