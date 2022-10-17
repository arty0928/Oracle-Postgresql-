const express = require('express');
const path = require('path');
const app = express();

const { Client } = require("pg");

const pg = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432
});
pg.connect();

const query = {
  text: "SELECT abs(-1)",
};
pg
  .query(query)
  .then((res) => {
    console.log(res.rows[0]);
    pg.end();
  })
  .catch((e) => console.error(e.stack));

app.listen(3002, function () {
  console.log('listening on 3002')
}); 

app.use(express.static(path.join(__dirname, 'op/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'op/build/index.html'));
});