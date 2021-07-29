const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('./appconfig/appconfig');
const { connectionString } = config;
import { Order } from './core/schema/orderSchema';
mongoose.connect(connectionString.contact+''+connectionString.port+'/'+connectionString.keyspace);
// get reference to database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connection Successful!");
    db.dropDatabase((err,success)=>{
        if(err){
            console.log('err ocuured',err);
            releaseDB();
        }
       else{
            console.log('delete sucessfull', success);
            releaseDB();
        //    createDB();
       } 
    });
    // db.collection.createIndex({ "rollId": 1, "className": 1, "items.sku": 1 }, { unique: true });
    
});
function releaseDB(){
db.close((err,succcess)=>{
     if(err) console.log('failed to close');
     else console.log('closed successfully');
})
}

// make this available to our users in our Node applications
// module.exports = User;