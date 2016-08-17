$(document).ready(function () {
  getBooks();

  // add a book
  $('#book-submit').on('click', postBook);
  $('#book-list').on('click', '.update', putBook);
  $('#book-list').on('click', '.delete', deleteBook);
});
/**
 * Retrieve books from server and append to DOM
 */
function getBooks() {
  $.ajax({
    type: 'GET',
    url: '/books',
    success: function (books) {
      console.log('GET /books returns:', books);
      books.forEach(function (book) {
        var $el = $('<div></div>');

        var bookProperties = ['title', 'author', 'published', 'edition', 'publisher', 'genre']




        bookProperties.forEach(function (property){

          if (property == 'published') {
            // inputType = 'date';
            // book[property] = new Date(book[property]);
            book[property] = new Date(book[property]);

            //get strings for month/day/year
            var month = book[property].getUTCMonth(book[property]) + 1; //months from 1-12
            var day = book[property].getUTCDate(book[property]);
            var year = book[property].getUTCFullYear(book[property]);

            //catcatcanate into one string month/day/year and set to book.published as text
            book[property] = month + "/" + day + "/" + year;
          }
          var $input = $('<input type="text" id="' + property + '"name="' + property + '" />');
          $input.val(book[property]);
          $el.append($input);
        });

        $el.data('bookID', book.id);
        $el.append('<button class="update">Update</update>');
        $el.append('<button class="delete">Delete</update>');


        $('#book-list').append($el);
      });
    },

    error: function (response) {
      console.log('GET /books fail. No books could be retrieved!');
    },
  });
}
/**
 * Add a new book to the database and refresh the DOM
 */
function postBook() {
  event.preventDefault();

  var book = {};

  $.each($('#book-form').serializeArray(), function (i, field) {
    book[field.name] = field.value;
  });

  $.ajax({
    type: 'POST',
    url: '/books',
    data: book,
    success: function () {
      console.log('POST /books works!');
      $('#book-list').empty();
      getBooks();
    },

    error: function (response) {
      console.log('POST /books does not work...');
    },
  });
}

function putBook(){
  var book = {};
  var inputs = ($(this).parent().children().serializeArray());
  $.each(inputs, function(i, field){
    book[field.name] = field.value;
  });
  console.log("book we are putting", book);
  var bookID = ($(this).parent().data('bookID'));

  $.ajax({
    type: 'PUT',
    url: '/books/' + bookID,
    data: book,
    success: function(){
      $('#book-list').empty();
      getBooks();
    },
    error: function(){
      console.log("error PUT /books/" + bookID);
    },
  });
};

function deleteBook(){
  var bookID = $(this).parent().data('bookID');
  $.ajax({
    type: 'DELETE',
    url: '/books/' + bookID,
    success: function(){
      console.log('DELETE success');
      $('#book-list').empty();
      getBooks();
    },
    error: function(){
      console.log('DELETE failed');
    }
  });
}
