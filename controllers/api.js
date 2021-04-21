
// import lowdb
const lowdb = require('lowdb')
// import file interface
const FileSync = require('lowdb/adapters/FileSync')
// setup DB connection
// initialize (mock) Database
const adapter = new FileSync('./data/db.json')
const db = lowdb(adapter)


exports.recordList = function(req,res){
  res.json(db.get('records').value())
}


exports.createRecords = function (req,res){
db.get("records").push(req.body).write();
  console.log(req.body);
  res.json(db.get("records").value());

}

