const express = require('express');


const customMiddleware = (req,res,next)=>{
    res.set('Access-Control-Allow-Origin','*')
    res.set('Access-Control-Allow-Methods','POST,Get,OPTIONS,DELETE')
    res.set('Access-Control-Allow-Header','Content-type,x-requested-with')
    next()

}

function ErrorHandlingMiddleware(err,req,res,next){
    //Handle Error
    res,json({error:err,massage:err.massage})
}

module.exports= customMiddleware


