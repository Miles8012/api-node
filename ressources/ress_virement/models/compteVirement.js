const mongoose = require('mongoose');

const CompteSchema = new mongoose.Schema({
    type: {
        type: String, 
        required: true
    }, 
    balance: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Compte', CompteSchema);