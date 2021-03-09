const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: false
    }, email: {
        type: String,
        required: true,
        unique: true
    }, following: {
        type: Number
    }, followers: {
        type: Number
    }, created: {
        type: Date,
        required: true
    },


})

module.exports = mongoose.model('User', UserSchema);
