const fs = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// express app creation
const Book = require('./models/Book');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


//VALIDATION
const { check, validationResult } = require('express-validator');
app.post('/form', [ check('authors').isLength({ min: 3 }),
                                 check('bookName').isLength({min:3}),
                                 check('price').isNumeric()
                                ], 
                    (req, res) => {
                       const errors = validationResult(req);
                       if (!errors.isEmpty()) {
                          return res.status(422).json({ errors: errors.array() });
                       }
                       const authors = req.body.authors;
                       const bookName = req.body.bookName;
                       const price = req.body.price;
	    
                 });
                  


// the public folder as a static files folder (so that files are accessible to client requests)
app.use(express.static('public'));
// SET EJS
app.set('view engine', 'ejs');

//ROUTERS -->

app.get('/Register', (request, response) => {
    response.render('Register');
  })
app.get('/Features', (request, response) => {
    response.render('Features');
  })

// Configure app to use booksRouter
const booksRouter = require('./router/booksRouter');
app.use('/books', booksRouter);
  



// if no route corresponds to request render 404 page
app.use((request, response) => {
    response.status(404).render('404');
  })
  

   //CONNECT TO MONGOOSE
   mongoose.set('strictQuery', false);
   mongoose.connect(process.env.MONGO_URI)
   .then((result)=>
   {
       console.log("CONNECTED TO MONGODB...");
       app.listen(process.env.PORT, () =>
       {
           console.log(`listening to port ${process.env.PORT}`);
       })
   
   }).catch((err) =>
   {
       console.log(err);
   });            