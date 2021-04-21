/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//creat Middleware
const customMiddleware = require('./middleware/customMiddleware')


/** ROUTERS */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
//we creat api Router
const apiRouter = require('./routes/api');


/** INIT */
const app = express();

app.use(customMiddleware)

/** LOGGING */
app.use(logger('dev'));

/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES */
app.use('/', indexRouter);
app.use('/users', usersRouter);
//we start do it api
app.use('/api',apiRouter)

/** EXPORT PATH */
module.exports = app;
