const mongoose = require('mongoose')

const SubAccountSchema = new mongoose.Schema({
    subAcct: {
        type: String,
        required: true
    },
    subDesc: {
        type: String,
        required: true
    },
    subGroup: {
        type: String,
        required: true
    },
    active: {
        type: String,
        required: true
    }
});


mongoose.model('SubAccount', SubAccountSchema);