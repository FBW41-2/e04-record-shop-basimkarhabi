const express = require('express');
const router = express.Router();

const {recordList,createRecords}=require('../controllers/api')

router
.route("/records")
.get(recordList)
.post(createRecords);

module.exports = router;
