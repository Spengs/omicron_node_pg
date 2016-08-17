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

      client.query('INSERT INTO books (author, title, published, edition, publisher, genre)'
                  + 'VALUES ($1, $2, $3, $4, $5, $6)',
                  [book.author, book.title, book.published, book.edition, book.publisher, book.genre],
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

router.put('/:id', function(req, res){
  var id = req.params.id;
  var book = req.body;

  pg.connect(connectionString, function(err, client, done){
    if(err){
      res.sendStatus(500);
    }

    client.query('UPDATE books ' +
                  'SET author = $1, ' +
                  'title = $2, ' +
                  'published = $3, ' +
                  'edition = $4, ' +
                  'publisher = $5, ' +
                  'genre = $6 ' +
                  'WHERE id = $7',
                  [book.author, book.title, book.published, book.edition, book.publisher, book.genre, id],
                  function(err, result){
                    done();
                    if(err){
                      console.log('err', err);
                      res.sendStatus(500);
                    }else{
                      res.sendStatus(200);
                    }


    });
  });
});

router.delete('/:id', function(req, res){
  var id = req.params.id; //matches thing next to colon

  pg.connect(connectionString, function(err, client, done){
    if(err){
      res.sendStatus(500);
    }

    client.query('DELETE FROM books ' +
                  'WHERE id = $1',
                    [id],
                    function (err, result){
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
