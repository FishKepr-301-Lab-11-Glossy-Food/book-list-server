'use strict'

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

const conString = 'postgres://localhost:5432/books_app';
const client = new pg.Client(conString);

app.get('/test', (req, res) => {
  res.send('testing');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));