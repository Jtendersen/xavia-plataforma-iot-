const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        surname: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
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
        isValidated:{
            type: Boolean,
        }

    },
    { timestamps: true }
)

UserSchema.pre('save', async function () {
    this.salt = bcrypt.genSaltSync()
    return (this.password = await bcrypt.hash(this.password, this.salt))
})

module.exports = mongoose.model('User', UserSchema)