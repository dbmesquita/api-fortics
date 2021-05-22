const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


router.get('/:cgc', (req, res, next) =>{
  mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
          `select nfe as "Nota Fiscal"
          , DATE_FORMAT (dtemissao,'%d/%m/%Y') as "Data de Emissão" 
          , DATE_FORMAT (dtvenc,'%d/%m/%Y') as "Data de Vencimento"
          , valor as "Valor em Aberto"
          , replace(linhadigformat,'  ', ' ') as "Linha Digitavel" 
          from tickets 
          where dtpag is not null
          and dtcancel is null
          and linhadigitavel is not null
          and cgc = ?;`,
          [req.params.cgc],
          (error, resultado, fields) =>{
            if (error) { return res.status(500).send({ error: error}) }
            return res.status(200).send({response: resultado})
           }
          )
      });    
});


module.exports = router;

