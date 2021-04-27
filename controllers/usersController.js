const mongodb = require('mongodb')

exports.getUsers = (req, res, next) => {
    req.app.locals.db.collection('users').find().toArray((err,docs)=>{
        res.json(docs)
    })
}

exports.getUser = (req, res, next) => {
    const { id } = req.params;
    const user = db.get('users').findOne({_id:new mongodb.ObjectID(id)},(err,result)=>{
        res.json(result)
    });
    res.status(200).send(user);


}

exports.deleteUser = (req, res, next) => {
    const { id } = req.params;
    req.app.locals.db.collection('users').deleteOne({_id:new mongodb.ObjectID(id)},(err,result)=>{
        if(err) console.error(err)
        console.log("Del result",result)
        // to Know how many we deleted
        res.json({deleted:result.deletedCount})
  })
}
exports.updateUser = (req, res, next) => {
    const { id } = req.params;
    const user = req.body;
    req.app.locals.db.collection('users').updateOne({_id:new mongodb.ObjectID(id)},
        {
            $set: user
        },(err,entry)=>{
        res.json(entry)
    })
}

exports.addUser = (req, res, next) => {
    const user = req.body;
    req.app.locals.db.collection('users').insertOne(user,(err,entry)=>{
        res.json(entry)
    })
   
}