var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: String,
    dateStart: Date,
    dateEnd: Date,
    category: String,
    description: String,
    featured: Boolean,
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateModified: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Event', eventSchema);