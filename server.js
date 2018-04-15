'use strict'

const pg = require('pg');
const cors = require('cors');
const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

// const conString = 'postgres://localhost:5432/books_app';
const DATABASE_URL = 'postgres://urksfufglaniux:45984851e5ec00418d245fe521c165749e81cb3825c276ddf0197853c5aa11b2@ec2-54-243-54-6.compute-1.amazonaws.com:5432/dd0s6294njttog';
const client = new pg.Client(DATABASE_URL);
client.connect();
app.use(cors());

app.get('*', (req, res) => res.redirect(CLIENT_URL));

app.get('/books', (req, res) => {
  console.log(req, res);
  client.query(`
  SELECT * FROM books;
  `)
    .then(function(result) {
      console.log(result);
      res.send(result.rows);
    })
    .catch(function(err) {
      console.error(err)
    })
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));