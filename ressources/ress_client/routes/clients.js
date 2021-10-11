const express = require('express');
const router = express.Router();
const Client = require('../models/client');
const Compte = require('../models/compte');

module.exports = router;

//Get all
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find();
        res.json(clients);
    } catch (err) {
        
    }
})
//Get one 
router.get('/:name', getClient, (req, res) => {
    res.send(res.client);
})
//Create one 
router.post('/', async (req, res) => {
    if (!req.body.name) {
        const client= new Client({
            name: req.body.name,
        });
        if (req.body.comptes != null) {
            req.body.comptes.forEach( compte => {
                const compteToAdd = new Compte(compte);
                client.comptes.push(compteToAdd);
            })
        }
    }
    try {
        const newClient = await client.save();
        res.status(200).json({ code: '201', newClient});
    } catch {
        res.status(200).json({ code: '400', message: 'bad request'})
    }
})
// Updating one 
router.patch('/:id', getClient, async (req, res) => {
    if (req.body.name != null && !req.body.name===res.client.name) {
        res.client.name = req.body.name;
        try {
            const updatedClient = await res.client.save();
            res.json(updatedClient)
        } catch(err) {
            res.status(200).json({ code: '400', message: 'bad request'});
        }
    } else {
        res.status(200).json({ code: '400', message: 'bad request'});
    }
})
//Delte one 
router.delete('/:id', getClient, async (req, res) => {
    try {
        await res.client.remove();
        res.json({ message: `Client ${res.client.name} was deleted`});
    } catch (err) {
        res.status(200).json({ code: '400', message: 'bad request'});
    }
})

async function getClient (req, res, next) {
    let client; 
    try {
        client = await Client.findById(req.params.id)
        if (client == null) {
            return res.status(200).json({ message: 'Cannot find client'})
        }
    } catch (err) {
        res.status(200).json({ code: '500', message: 'internal server error'})
    }
    res.client = client;
    next();
}