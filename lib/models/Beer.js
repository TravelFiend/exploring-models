const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    brewType: {
        type: String,
        required: true
    },
    abv: {
        type: Number,
        required: true,
        min: 0.1,
        max: 67.5
    },
    volume: {
        type: String,
        required: true
    },
    agedYears: {
        type: Number,
        required: true,
        min: 0,
        max: 200
    },
    bottle: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('', schema);
