const mongoose = require('mongoose');

const ClientVirementSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    comptes: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Compte'
    }]
})

module.exports = mongoose.model('ClientVirement', ClientVirementSchema);