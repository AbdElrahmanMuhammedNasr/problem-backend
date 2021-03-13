const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CommentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post',

    }, userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',

    }, comment: {
        type: String,
        required: true
    }, created: {
        type: Date,
        required: true
    }

})
module.exports = mongoose.model('Comments', CommentSchema)
