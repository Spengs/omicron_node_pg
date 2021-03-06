var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


//Our routes
var books = require('./routes/books');//link to books file


app.use(bodyParser.urlencoded({ extended: true }));

app.use('/books', books); //go find that required route, then do whats in there

// Catchall route
app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, './public', file));
});

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
  console.log('Listening on port ', app.get('port'));
});
