const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userQueryesSchema = Schema({
    userName: {
        type: String,
        required: true,
        unique: false
    },
    userEmail: {
        type: String,
        required: true,
        unique: false
    },
    userQuery: {
        type: String,
        required: true,
        unique: false
    },
    queryDate: {
        type: String,
        required: true,
        unique: false
    }
})

const FormQuery = mongoose.model("form_queryes", userQueryesSchema)

module.exports = FormQuery