'use strict'

const pg = require('pg');
const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT;
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

const DATABASE_URL = process.env.DATABASE_URL;

const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());


app.get('/books', (req, res) => {
  client.query(`
  SELECT * FROM books;
  `)
    .then(function(result) {
      res.send(result.rows);
    })
    .catch(function(err) {
      console.error(err)
    })
});

app.get('/api/v1/books', (req, res) => {
  client.query(`
  SELECT 
  book_id,
  title,
  author,
  img_url
  FROM books;
  `)
    .then(function(result) {
      res.send(result.rows);
    })
    .catch(function(err) {
      console.error(err)
    })
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));