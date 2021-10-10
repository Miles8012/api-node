require('dotenv').config();

const mongoose = require('mongoose');
const clients = require('./clients');
const Client = require('../models/client');
const Compte = require('../models/compte');

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error: "));
db.once('open', () => {
    console.log('Database connected');
})

const seedDB = async () => {
    await Client.deleteMany({});
    for (const client of clients) {
        const newClient = new Client({
            name: client.name
        })
        client.comptes.forEach(compte => {
            const compteToAdd = new Compte(compte);
            newClient.comptes.push(compteToAdd);
        })
         await newClient.save()
         console.log(`New client ${newClient} added`);
     }
}

seedDB().then(() => {
    mongoose.connection.close(console.log("Disconnected"));
});