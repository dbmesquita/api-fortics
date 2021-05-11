const express = require ( 'express');
const app = express();

const rotaTicket = require('./routes/ticket');
app.use('/ticket', rotaTicket);



module.exports = app;