const express = require('express');
const Book = require('../models/Book');

//ROUTER
const router = express.Router();


//ROUTER GETS GETALLBOOKS FUNCTION FOR ADDING
const getAllBooks = (req, resp) => {
    Book.find()
        .then((result) => {
            resp.render('books', { books: result });
        }).then((err) => {
            console.log(err);
        }
        );
}
router.get('/', getAllBooks);



//SEARCH
const getAllBooksByName = (request, response) => {
    Book.find({ bookName: request.query.bookNameSearch })
        .then((result) => {
            response.render('books', { books: result })
        })
        .catch((err) => {
            console.log(err);
        })
};
router.get('/bookname', getAllBooksByName);

// ADD BOOK FUNCTION
router.post('/', (req, res) => {
    let newBook = new Book({
        authors: req.body.authors,
        bookName: req.body.bookName,
        imgSrc: req.body.imgSrc
    });
    newBook.save();
    res.redirect('/books');
})

//Update
  router.patch('/manage/update/:id', (req, res) =>{
    const {_id} = req.params;
    const {authors, bookName, imgSrc} = req.body;
    const user = Book.find((user) => user._id = _id);

    if(authors) user.authors = authors;
    if(bookName) user.bookName = bookName;
    if(imgSrc) user.imgSrc = imgSrc;

    res.send(`User with ${_id}`)
  });
   

 
  // Delete
  const delete_article = (request, response) => {
    let id = request.params.id;
    Book.findByIdAndDelete(id)
    .then((res) => {
      console.log(`Article deleted from database: id -> ${res._id}`);
      response.json({ redirect: '/books/manage'});
    })
   .catch((err) => { console.log(err) });
  };

  router.delete('/manage/delete/:id', delete_article);
   
//ROUTER GETS GETALLBOOKS FUNCTION FOR ADDING
const manageBooks = (req, resp) => {
    Book.find()
        .then((result) => {
            resp.render('books_management', { books: result });
        })
        .catch((err) => {
            console.log(err);
        }
        );
}
router.get('/manage', manageBooks);

module.exports = router;