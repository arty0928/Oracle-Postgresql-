const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const port = 3002;

const { Client } = require("pg");

const pg = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432
});
pg.connect();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());



app.post("/text", (req, res) => {//데이터 받는 곳
  const text1 = req.body.inText;
  console.log(text1);

  pg.query(text1, (err, result) => {
    if(err){
      console.log('error ', err);
    }else{

      var sendText = result.rows[0];

      console.log(sendText);
      res.send("전송완료!");
    }

  })
  /*
  pg.query(text1, (err, result) => {

    res.send(`Result : ${result.rows[0]}`);
  });

  
  
  
  pg
  .query(text1)
  .then((r) => {

    console.log(r.rows[0]);
    
  })
  .catch((e) => console.error(e.stack));

  const sendText ={
    text: "보내기  성공",
  };
  res.send(sendText);
  */

  

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.static(path.join(__dirname, 'op/build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'op/build/index.html'));
});

/*
const query = {
  //text: "SELECT NULLIF ('A','AB') AS ans;",

  text: text1,
};

pg
  .query(query)
  .then((res) => {

    console.log(res.rows[0]);
    pg.end();
  })
  .catch((e) => console.error(e.stack));
*/

