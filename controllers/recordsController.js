const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);


exports.getRecords = (req, res, next) => {
    const records = db.get('records').value()
    res.status(200).json(records);
}


exports.addRecord = (req, res, next) => {
    const record = req.body;
    record.id = Date.now().toString() 
    console.log(req.body)
    db.get('records').push(record)
      
        .write()
    res.status(200).json(record);
}