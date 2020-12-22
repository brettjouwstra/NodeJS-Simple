const mongoose = require('mongoose');

// Create DataBase Schema

const BookmarkSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        
    }],
    primaryTag: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now
    },
    meta: {
        type: Number,
        clicks: String,
        default: 0
    }
});

module.exports = mongoose.model('Posts', BookmarkSchema);