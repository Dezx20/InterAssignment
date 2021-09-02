var express = require('express');
var router = express.Router();
const tableCtrl = require("../controller/table");
// const Table = mongoose.model("tableData");
/* GET home page. */
// router.get('/home',async function(req, res, next) {
//   // let data = await fetch('/api/get-data');
//   // console.log("data"+data);
//   res.render('form', { title: 'Home'});
// });


router.get('/', tableCtrl.getTableData);

router.get('/update-form/:id', function(req, res, next) {
  
  res.render('updateForm', { title: 'update Form',id : req.params.id });
});

module.exports = router;
