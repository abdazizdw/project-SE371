const fs = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config();


// express app creation
const app = express();


// listen for requests
app.listen(process.env.PORT, "localhost", () => { console.log(`Listening on port ${process.env.PORT}...`) });

// the public folder as a static files folder (so that files are accessible to client requests)
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.render('index');
  })


app.get('/Register', (request, response) => {
    response.render('Register');
  })


app.get('/Featurese', (request, response) => {
    response.render('Features');
  })



// if no route corresponds to request render 404 page
app.use((request, response) => {
    response.status(404).render('404');
  })
  