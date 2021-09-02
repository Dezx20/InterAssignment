var express = require('express');
var router = express.Router();
const tableCtrl = require("../controller/table");


/* GET users listing. */

router.post('/send-data', tableCtrl.sendTableData);
router.post('/add-data', tableCtrl.addTableData);
router.post('/update-data/:id', tableCtrl.updateTableData);
router.get('/delete-data/:id', tableCtrl.removeTableData);


module.exports = router;
