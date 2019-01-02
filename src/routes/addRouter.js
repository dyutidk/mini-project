const express=require('express');
const Userdata=require('../model/user_data.js');
const addRouter=express.Router();
var bodyParser = require('body-parser');
addRouter.use(bodyParser.json());
addRouter.use(bodyParser.urlencoded({ extended: true }));



function router(test){

    
 addRouter.route('/').get((req,res)=>{   
    res.render('signup',{test});

    })


addRouter.route('/add').post((req,res)=>{
        var item={
            name:req.body.name,
            mail:req.body.email,
            password:req.body.psw
        }
        var user=new Userdata(item);
        user.save();
        res.redirect('/');
         
    })



return addRouter;
}

module.exports=router;
