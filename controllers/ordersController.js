const mongodb = require('mongodb')
exports.getOrders = (req, res, next) => {
    req.app.locals.db.collection('orders').find().toArray((err,docs)=>{
        res.json(docs)
    })

   // const orders = db.get('orders').value()
   // res.status(200).send(orders);
}

exports.getOrder = (req, res, next) => {
    const { id } = req.params;
    const order = db.get('orders').find({_id:new mongodb.ObjectID(id)},(err,result)=>{
        res.json(result)
    });
}

exports.deleteOrder = (req, res, next) => {
    const { id } = req.params;
    req.app.locals.db.collection('orders').deleteOne({_id:new mongodb.ObjectID(id)},(err,result)=>{
        if(err) console.error(err)
        console.log("Del result",result)
        // to Know how many we deleted
        res.json({deleted:result.deletedCount})
  })
}

exports.updateOrder = (req, res, next) => {
    const { id } = req.params;
    const order = req.body
    req.app.locals.db.collection('orders').updateOne({_id:new mongodb.ObjectID(id)},
        {
            $set: order
        },(err,entry)=>{
        res.json(entry)
    })
}

exports.addOrder = (req, res, next) => {
    const order = req.body;
    //access db from globel object 
    req.app.locals.db.collection('orders').insertOne(order,(err,entry)=>{
        res.json(entry)
    })
    

}