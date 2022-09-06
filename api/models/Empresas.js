const mongoose = require('mongoose')


const EmpresasSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
            users: {
            type: Array,
        },
        cuit: {
            type: Number,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: Number,
        },
        imgUrl: {
            type: String,
        }


    },
    { timestamps: true }
)


module.exports = mongoose.model('Empresas', EmpresasSchema)
