const mongoose = require('mongoose')

const SubAccountSchema = new mongoose.Schema({
    SubAcct: {
        type: String,
        required: true
    },
    SubDesc: {
        type: String,
        required: true
    },
    SubGroup: {
        type: String,
        required: true
    },
    Active: {
        type: String,
        required: true
    }
});


mongoose.model('SubAccount', SubAccountSchema);