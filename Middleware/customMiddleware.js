const express = require('express');

// custom middleware create
const customMiddleware = function (req, res, next) {

    res.set("Access-Control-Allow-Origin",'*' )
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE" )
    res.set("Access-Control-Allow-Headers", "Content-Type, x-requested")

	console.log('body data', req.body)
	next()
}


module.exports = customMiddleware;
