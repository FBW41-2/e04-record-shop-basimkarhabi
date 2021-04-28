const User = require('../models/User')

exports.getUsers = (req, res, next) => {
  User.find((err, users) => {
    if (err) return console.error(err);
    res.json(users)
  })
};

// get specific user
exports.getUser = (req, res, next) => {
  const { id } = req.params;
  console.log("get user", req.id)
  User.findById(id, (err, entry) => {
    if (err) return res.json({error: err});
    res.json(entry)
  })
};

exports.deleteUser = (req, res, next) => {
  const {id}= req.params;
  User.findByIdAndRemove(id,(err,entry)=>{
    if(err) return res.json({error:err})
    res.json({deleted:entry})
  })
};

exports.updateUser = (req, res, next) => {
  const {id} = req.params
  User.findByIdAndUpdate(id,req.body,{new:true},(err,entry)=>{
    if(err) return res.json({error:err})
    res.json(entry)
  })
};

exports.addUser = (req, res, next) => {
  user=req.body
  User.create(user,(err,entry)=>{
    if (err) return res.json({error:err})
    res.json(entry)
  })
};
