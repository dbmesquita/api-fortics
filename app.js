const express = require ( 'express');
const app = express();
const morgan = require('morgan');


const rotaTicket = require('./routes/ticket');
const rotaOrder = require('./routes/order');

app.use(morgan('dev'));
app.use('/ticket', rotaTicket);
app.use('/order', rotaOrder);

app.use((req, res, next) =>{
  const erro = new Error('Não encontrado');
  erro.status = 404;
  next(erro);
});


app.use((error, req, res, next) =>{
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.mensagem
      } 
    });
});
module.exports = app;