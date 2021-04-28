/** EXTERNAL DEPENDENCIES */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
//to dive us massege in Terminal
const logger = require('morgan');

//Import MangoDb 
const {MongoClient} = require('mongodb');
require('dotenv').config()

/** ENV VAREIABLES **/
const dBURL = process.env.DB_URL
const dBPassword =process.env.DB_PASSWORD
const dBUser = process.env.DB_USER



/** ROUTERS */
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const ordersRouter = require('./routes/orders');
const { setCors } = require("./middleware/security");
const { allowedNodeEnvironmentFlags } = require('process');

/** INIT */
const app = express();

/** LOGGING */
app.use(logger('dev'));

/**CONNECT TO MONGODB **/
async function connectDB() {
    const url = `mongodb+srv://${dBUser}:${dBPassword}@${dBURL}`
    const client = new MongoClient(url);

    try {
        await client.connect();
            console.log('Connected !!')
        
        //SEEd DataBase
            //Create records
            //creat users
            //creat orders


        // assign db to global object
     app.locals.db =client.db('')  // we could her write the name of our Db 
  //      await listDatabases(client);
     
    } catch (error) {
        console.error(error);
//that will help to stop connection if we did not uas it 
    } 
    
}


connectDB().catch(console.error)



async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));

}

/** SETTING UP LOWDB */
const adapter = new FileSync('data/db.json');
const db = low(adapter);
db.defaults({
    records: [],
    users: [],
    orders: []
}).write();


/** REQUEST PARSERS */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(setCors);

/** STATIC FILES*/
app.use(express.static(path.join(__dirname, 'public')));

/** ROUTES */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/records', recordsRouter);
app.use('/orders', ordersRouter);

/** ERROR HANDLING */
app.use(function (req, res, next) {
    const error = new Error('Looks like something broke...');
    error.status = 400;
    next(error);
});

app.use(function (err, req, res, next) {
    res.send({
        error: {
            message: err.message
        }
    });
});


/** EXPORT PATH */
module.exports = app;
