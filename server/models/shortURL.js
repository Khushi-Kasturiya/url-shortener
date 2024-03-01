const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
    originalUrl: String,
    shortBaseUrl: String,
    urlCode: String,
    date: { type: String, default: Date.now },
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);