const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }, title: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }, problem: {
        type: String,
        required: true
    }, solution: {
        type: String,
        required: false
    }, category: {
        type: String,
        required: true
    }, created: {
        type: Date,
        required: true
    }

})
module.exports = mongoose.model('Post', PostSchema)
