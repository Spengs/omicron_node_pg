var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/Omicron' //database location

router.get('/', function(req, res){ //app.js route finds this, and does the thing
  //retrieve books from database
  pg.connect(connectionString, function(err, client, done){ //2 params: 1.connect to, and 2. function
    if(err){
      res.sendStatus(500);
    }

    client.query('SELECT * FROM books', function(err, result){//second param always has results of query
      done();// closes the connection, I only have 10!

      if(err){
        res.sendStatus(500);
      }

      res.send(result.rows);
    });
  });
});

router.post('/', function(req, res){
  var book = req.body;

  pg.connect(connectionString, function(err, client, done){
      if(err){
        res.sendStatus(500);
      }

      client.query('INSERT INTO books (author, title, published, edition, publisher)'
                  + 'VALUES ($1, $2, $3, $4, $5)',
                  [book.author, book.title, book.published, book.edition, book.publisher],
                  function(err, result){
                    done();
                    if(err){
                      res.sendStatus(500);
                    }else{
                    res.sendStatus(201);
                  }
                  });
  });
});
module.exports = router;
