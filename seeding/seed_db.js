//Import MangoDb 
const {MongoClient} = require('mongodb');
require('dotenv').config()

/** ENV VAREIABLES **/
const dBURL = process.env.DB_URL
const dBPassword =process.env.DB_PASSWORD
const dBUser = process.env.DB_USER

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
//        app.locals.db =client.db('')  // we could her write the name of our Db 
  //      await listDatabases(client);
     
    } catch (error) {
        console.error(error);
//that will help to stop connection if we did not uas it 
    } 
    
}

connectDB().catch(console.error)