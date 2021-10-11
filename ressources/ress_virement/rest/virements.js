const express = require('express');
const router = express.Router();
const ClientVirement = require('../models/clientVirement');
const ClientService = require('../services/clientService');

module.exports = router;

// Faire un virement compte a compte
router.post('/:id', async (req, res) => {
    if(!req.body.compteDebiteur  && !req.body.CompteCrediteur) {
        let client = await ClientService.getClient()
        .then(() => {
            console.log(client.json());
        })
        .catch(err => {
            console.error(err);
        });
    } else {
        res.status(200).json({ code: '400', message: 'One paramater missing'});
    }
})