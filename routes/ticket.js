const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Get todos os Boletos'
  });
})
router.get('/:idTicket', (req, res, next) => {
  const id = req.params.idTicket
  if (id ==='especial') {
    res.status(200).send({
      mensagem: 'Get Boletos pelo id!',
      id: id
    });
  } else {
    res.status(200).send({
      mensagem: 'Voce passou o id',
  });
}
})
module.exports = router;