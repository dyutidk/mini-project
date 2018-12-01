const express=require('express');
const Userdata=require('../model/user_data.js');
const Bookdata=require('../model/book_data.js');
const addbookRouter=express.Router();

function router(test){
    addbookRouter.route('/').get((req,res)=>{

        

    })
return addbookRouter;
}
module.exports=router;