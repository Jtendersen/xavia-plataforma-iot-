const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,

        },
        surname: {
            type: String,
            required: true,

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
        },
        resetLink:{
            type: String,
        },

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