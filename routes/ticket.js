const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Testando Rota de Boletos!'
  });
})
router.get('/:idTicket', (req, res, next) => {
  const id = req.params.idTicket
  if (id ==='especial') {
    res.status(200).send({
      mensagem: 'Testando ID Rota de Boletos!',
      id: id
    });
  } else {
    res.status(200).send({
      mensagem: 'Voce passou o id',
  });
}
})
module.exports = router;