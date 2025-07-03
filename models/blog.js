const mongoose = require('mongoose');
const Schema = mongoose.Schema

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog