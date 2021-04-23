const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
const mongodb = require('mongodb')

exports.getRecords = (req, res, next) => { // he how to get DB from we where i store it 
// access db from global object in /app.js/  //find : select all records if we live it empty!!
    req.app.locals.db.collection('records').find().toArray((err,docs)=>{
        res.json(docs)
    })
    //const records = db.get('records').value()
   // res.status(200).send(records);
}

exports.getRecord = (req, res, next) => {
    const { id } = req.params;
   const record = db.get('records').find({ id });
    res.status(200).send(record);
}

exports.deleteRecord = (req, res, next) => {
    const { id } = req.params;

    req.app.locals.db.collection('records').deleteOne({_id:new mongodb.ObjectID(id)},(err,result)=>{
        if(err) console.error(err)
        console.log("Del result",result)
        res.json({deleted:result.deletedCount})
  })

   // const record = db.get('records').remove({ id }).write();
    res.status(200).send(record);
}

exports.updateRecord = (req, res, next) => {
    const { id } = req.params;
    const dt = req.body;
    const record = db.get('records').find({ id }).assign(dt).write();
    res.status(200).send(record);
}

exports.addRecord = (req, res, next) => {
    const record = req.body;
    //access db from globel object 
    req.app.locals.db.collection('records').insertOne(record,(err,entry)=>{
        res.json(entry)
    })
   // db.get('records').push(record)
     //   .last()
       // .assign({ id: Date.now().toString() })
       // .write()

   // res.status(200).send(record);
}