const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    content: {
        type: String,
        require: true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    }
},{timestamps: true})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment