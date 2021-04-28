const Order =require('../models/Order')

exports.getOrders = (req, res, next) => {
  Order.find((err, orders) => {
    if (err) return console.error(err);
    res.json(orders) 
  })

};
//// get specific Order
exports.getOrder = (req, res, next) => {
  const { id } = req.params;
  console.log("get Order", req.id)
  Order.findById(id, (err, entry) => {
    if (err) return res.json({error: err});
    res.json(entry)
  })

 
};

exports.deleteOrder = (req, res, next) => {
  const { id } = req.params;
  Order.findByIdAndRemove(id,(err,entry)=>{
    if(err) return res.json({error:err})
    res.json({deleted:entry})
  })
};

exports.updateOrder = (req, res, next) => {
  const { id } = req.params;
  Order.findByIdAndUpdate(id,req.body,{new:true},(err,entry)=>{
    if(err) return res.json({error:err})
    res.json(entry)
  })
};

exports.addOrder = (req, res, next) => {
  const order = req.body;
  Order.create(order,(err,entry)=>{
    if (err) return res.json({error:err})
    res.json(entry)
  })

};
