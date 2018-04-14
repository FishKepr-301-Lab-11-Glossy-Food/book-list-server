'use strict'

const pg = require('pg');
const cors = require('cors');
const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

// const conString = 'postgres://localhost:5432/books_app';
const DATABASE_URL = 'postgres://urksfufglaniux:45984851e5ec00418d245fe521c165749e81cb3825c276ddf0197853c5aa11b2@ec2-54-243-54-6.compute-1.amazonaws.com:5432/dd0s6294njttog'
const client = new pg.Client(DATABASE_URL);
client.connect();
app.use(cors());

// app.use(cors());
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

// function loadBooks() {
//   client.query('SELECT COUNT(*) FROM books_app')
//     .then(result => {
//       if(!parseInt(result.rows[0].count)) {
//         fs.readFile('./books.json', 'utf8', (err, fd) => {
//           JSON.parse(fd).forEach(ele => {
//             client.query(`
//               INSERT INTO
//               books(title, author, isbn, image_url, description)
//               VALUES ($1, $2, $3, $4, $5);
//             `,
//             [ele.title, ele.author, ele.isbn, ele.image_url, ele.description]
//             )
//           })
//         })
//       }
//     })
// }

// //DATABASE LOADER
// function loadDB() {
//   client.query(`
//     CREATE TABLE IF NOT EXISTS books (
//       book_id SERIAL PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       author VARCHAR(255) NOT NULL,
//       isbn VARCHAR (255) NOT NULL,
//       image_url VARCHAR(20) NOT NULL,
//       description TEXT NOT NULL);`
//   )
//     .then(() => {
//       loadBooks();
//     })
//     .catch(err => {
//       console.error(err);
//     });
// }