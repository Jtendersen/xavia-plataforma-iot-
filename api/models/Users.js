const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,

        },
        cuit: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            //required: true,
        },
        salt: {
            type: String,
        },

        roles: {
            type: Array,
        },
        empresa:{
            type: Array,
        },
        devices:{
            type: Array,
        },
        isActivated:{
            type: Boolean,
            default: false,
        },
        activationCode:{
            type: Number,
        }

    },
    { timestamps: true }
)

UserSchema.pre('save', async function () {
    if (this.isActivated === true){
    this.salt = bcrypt.genSaltSync()
    return (this.password = await bcrypt.hash(this.password, this.salt))
    }
})

module.exports = mongoose.model('User', UserSchema)