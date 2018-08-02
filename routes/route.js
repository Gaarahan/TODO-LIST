const express = require('express');
const  router = express.Router();
const dbfunc = require('../util/dbfunc');

let postData = [];

router.get('/',function(req,res){
  dbfunc.getAll(function (result) {
    postData = [];
    for(let i = 0; i < result.length;i++)
      postData.push(result[i]);

    let count = 0;
    postData.forEach(function (item) {
      if(item.status === "active")
        count ++;
    });
    if(count === 0)
      count = "NO";
    res.render("./index",{
      "data": postData,
      "left" : count
    });

  });
});

router.post('/add',function (req,res) {
  dbfunc.add(req.body,() => {
    res.end();
  });
});

router.post('/edit',function (req, res) {
  let id = postData[req.body.index].things_id;
  dbfunc.updateById(req.body.message,id,() => {
    res.end();
  });
});

router.post('/del',function (req,res) {
  let id = postData[req.body.index].things_id;
  dbfunc.delById(id,() => {
    res.end();
  });
});

router.post('/check',function (req, res) {
  postData[req.body.index].status = req.body.checked?"complete":"active";
  res.end();
});



module.exports = router;