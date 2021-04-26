const mongodb = require('mongodb')

exports.getRecords = (req, res, next) => { // he how to get DB from we where i store it 
// access db from global object in /app.js/  //find : select all records if we live it empty!!
    req.app.locals.db.collection('records').find().toArray((err,docs)=>{
        res.json(docs)
    })
}

exports.getRecord = (req, res, next) => {
    const { id } = req.params;
   const record = db.get('records').findOne({_id:new mongodb.ObjectID(id)},(err,result)=>{
       res.json(result)
   });
    res.status(200).send(record);
}

exports.deleteRecord = (req, res, next) => {
    const { id } = req.params;
    req.app.locals.db.collection('records').deleteOne({_id:new mongodb.ObjectID(id)},(err,result)=>{
        if(err) console.error(err)
        console.log("Del result",result)
        // to Know how many we deleted
        res.json({deleted:result.deletedCount})
  })

}

exports.updateRecord = (req, res, next) => {
    const { id } = req.params;
    const record = req.body;
    req.app.locals.db.collection('records').updateOne({_id:new mongodb.ObjectID(id)},
        {
            $set: record
        },(err,entry)=>{
        res.json(entry)
    })

}

exports.addRecord = (req, res, next) => {
    const record = req.body;
    //access db from globel object 
    req.app.locals.db.collection('records').insertOne(record,(err,entry)=>{
        res.json(entry)
    })
}