const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
var password = 'senha';


async function selectTicketsById(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: 'user',
      password: password,
      connectString: "localhost:1521/orcl"
    });
    let query = 'SELECT cod, cliente FROM client where cod=:id';
    // run query to get employee with employee_id
    result = await connection.execute(query, [id]);

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }
  }
}

//get /employee?id=<id employee>
router.get('/cpf', function (req, res) {
  //get query param ?id
  let id = req.query.id;
  // id param if it is number
  if (isNaN(id)) {
    res.send('Query param id is not number')
    return
  }
  selectTicketsById(req, res, id);
})

///app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))

module.exports = router;