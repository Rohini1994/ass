

const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');
//  const bcrypt = require('bcryptjs');





module.exports.register =(req,res,next) =>{

 var user = new User();
   user.fullName = req.body.fullName;
  user.email = req.body.email;
   user.password = req.body.password;
user.save((err,doc) => {
    if(!err)
        res.send(doc);
        else{
            if(err.code == 11000)
            res.status(422).send(['Duplicate Email Address Found']);
            else 
             return next(err);
             
        }
       
      
    
});

}

module.exports.authenticate = (req,res,next)  =>{
    //call for passport authentication
    passport.authenticate('local',(err,user,info) => {
        //error from passport middleware
        if(err) return res.status(400).json(err);
        //register User
        else if (user) res.status(200).json({"token":user.generateJwt()});
        //unknown user or wrong password
        else return res.status(404).json(info);
    })(req,res);
}

module.exports.userProfile = (req,res,next) =>{
    User.findOne({_id:req._id},
        (err,user) => {
            if(!user)
            return res.status(404).json({status:false,message:'User record not found'});
            else
            return res.status(200).json({status: true, user : _.pick(user,['fullName','email'])});
        });
}






































// const express = require('express');
// var router = express.Router();
// var ObjectId = require('mongoose').Types.ObjectId;

// var {Employee} =require('../models/employee')

// //=> localhost:3000/employees/

// router.get('/', (req,res) => {
//     Employee.find((err,docs) => {
//         if(!err){
//             res.send(docs);
//         }
//         else{
//             console.log('Error In Retriving Employee:',+JSON.stringify(err,undefined,2));
//         }

//     });

// });

// router.get('/:id',(req,res)=>{
//     if(!ObjectId.isValid(req.params.id))
//         return res.status(400).send('No Record With Given Id : ${req.params.id}');

//         Employee.findById(req.params.id,(err,doc) =>{
//             if(!err){
//                 res.send(doc);
//             }
//             else{
//                 console.log('Error In Retriving Employee:'+JSON.stringify(err,undefined,2));
//             }
//         });
    


// });

//  router.post('/',(req,res) => {
//      var emp = new Employee({
//          name: req.body.name,
//          dob:req.body.dob,
//          address:req.body.address,
//          role:req.body.role,
//          salary:req.body.salary,
//          experience:req.body.experience,

//      });
//      emp.save((err,doc) =>{
//          if(!err){
//              res.send(doc);
//          }
//          else{
//              console.log ('Error in Employee save:' +JSON.stringify(err,undefined,2));
//          }


//      });
//  });


//  router.put('/:id',(req,res)=>{
//     if(!ObjectId.isValid(req.params.id))
//     return res.status(400).send('No Record With Given Id : ${req.params.id}');

//     var emp = {
//         name: req.body.name,
//         dob:req.body.dob,
//         address:req.body.address,
//         role:req.body.role,
//         salary:req.body.salary,
//         experience:req.body.experience,
//     };
//     Employee.findByIdAndUpdate({_id:req.params.id},emp,{new :true},(err,doc)=>{
//         if(!err){
//             res.send(doc);
//         }
//         else{
//             console.log ('Error in Employee Update:' +JSON.stringify(err,undefined,2));
//         }

//     });

//  });


//  router.delete('/:id',(req,res) => {
//     if(!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`No Record With Given Id : ${req.params.id}`);

//     Employee.findOneAndRemove({_id:req.params.id},(err,doc)=>{
//         if(!err){
//             res.send(doc);
//         }
//         else{
//             console.log ('Error in Employee delete:' +JSON.stringify(err,undefined,2));
//         }

//     });

//  });

// module.exports = router;