const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/route.js');

//设置ejs模板引擎
app.set('view engine','ejs');

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(jsonParser);
app.use(urlencodedParser);
app.use('/public',express.static('public'));

app.use('/',router);

app.listen(8888,function(err){
  if(err)
    throw err;
  console.log("create server at http://localhost:8888");
});