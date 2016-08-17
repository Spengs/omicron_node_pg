var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/Omicron'

router.get('/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
  pg.connect(connectionString, function(err, client, done){
      if(err){
        console.log('it broke on 1');
        res.sendStatus(500);
      }
      client.query('SELECT * FROM books WHERE genre = $1',
                    [id],
                    function (err, result){
                      done();
                      if(err){
                        console.log("it broke on 2");
                        res.sendStatus(500);
                      }else{
                        res.send(result.rows);
                      }

    });
  });
  });

  module.exports = router;
