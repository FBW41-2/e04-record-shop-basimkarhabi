/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const customMiddleware = require('./Middleware/customMiddleware')


/** ROUTERS */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');

/** INIT */
const app = express();

/** LOGGING */
app.use(logger('dev'));
//MIddleweare
app.use(customMiddleware)

/** SETTING UP LOWDB */
const adapter = new FileSync('data/db.json');
const db = low(adapter);


/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));


/** ROUTES */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);

/** EXPORT PATH */
module.exports = app;
