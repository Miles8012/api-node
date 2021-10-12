const mongoose = require('mongoose');

const CompteVirementSchema = new mongoose.Schema({
    type: {
        type: String, 
        required: true
    }, 
    balance: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('CompteVirement', CompteVirementSchema);