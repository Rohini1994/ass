const mongoose = require('mongoose');

 mongoose.connect(process.env.MONGODB_URI, (err) =>{
     if(!err){
         console.log('mongodb Connected sucessfully');
     }
     else{
        console.log('Error in Mongodb Connection:' +JSON.stringify(err,undefined,2));
     }
 });

 require('./user.model');