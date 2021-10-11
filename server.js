require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection; 

db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to database'));

app.use(express.json())

const clientsRouter = require('./ressources/ress_client/routes/clients');
app.use('/clients', clientsRouter);

const virementsRouter = require('./ressources/ress_virement/rest/virements')
app.use('/virements', virementsRouter);

app.listen(3031, () => console.log('Server on'))
