var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var headLineSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

var HeadLine = mongoose.model("Headline", headLineSchema);

module.exports = HeadLine;

// headLineSchema is meant to store any sort of data coming in from the scraper
// if we have a string for the title of an article, it is placed within the headline element of the new headLineSchema