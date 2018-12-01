// router for checking password
var test=0
const express=require('express');
const Userdata=require('../model/user_data.js');
const Bookdata=require('../model/book_data.js');
const Transactiondata=require('../model/transaction_data.js');
// const addbookRouter=require('./addbookRouter')(test);
var pwdRouter=express.Router();
var bodyParser = require('body-parser');
pwdRouter.use(bodyParser.json());
pwdRouter.use(bodyParser.urlencoded({ extended: true }));
var res_1
var res_2
var books
var b_id
var t_id
var i=0
var indexarr=[]
var bookidarr=[]
var booknamearr=[]
var tran_length=0



function router(test){

    pwdRouter.post('/',(req,res)=>{
        u_name=req.body.uname;
        pwd=req.body.psw;

        Bookdata.find({$and:[{ "app_status" : "approved" },{'status':"free"}]},function(err,result){
            if(err) throw err;
            books=result;    
        })


        if(u_name=="admin"&&pwd=='admin')
        {
            Bookdata.find({"app_status":"pending"},function(err,result){
                if(err) throw err;
                res_2=result;
                if(result){
                res.render('admin',{res_2});
                }else
                res.send('No pending items');
            })

            
        };
	    Userdata.findOne({$and:[{name:u_name},{password:pwd}]},function(error,result){
           if(result){
               res_1=result;
            res.render('user',{res_1,books});
           }
        //    else
        //    res.send('error no user found');

        })
	
    })
    // pwdRouter.use('/addbook',addbookRouter);
    pwdRouter.get('/addbook',(req,res)=>{
        res.render('addbook',{res_1});
    })

    pwdRouter.post('/addbookdata',(req,res)=>{
       var item={
           title:req.body.title
           ,desc:req.body.desc
           ,status:req.body.status
           ,app_status:req.body.app_status
           ,owner_id:req.body.owner_id
           ,borr_id: '0'

       }
       var data=new Bookdata(item);
       data.save();
       res.render('user',{res_1,books});
    })

    pwdRouter.get('/back',(req,res)=>{
        res.render('user',{res_1,books});
    })

    pwdRouter.get('/remove/:id',(req,res)=>{
        var id =req.params.id;
        Bookdata.deleteOne({_id:id},function(req1,res1){
        });
        Bookdata.find({"app_status":"pending"},function(err,result){
            if(err) throw err;
            res_2=result;
            if(result){
            res.render('admin',{res_2});
            }else
            res.send('No pending items');
        })
                
    })

    pwdRouter.get('/approve/:id',(req,res)=>{
        var id =req.params.id;
        // console.log('id');
        // console.log(id);
        var query={ "_id":id };
        var data={ $set: { "app_status" : "approved" }};
        Bookdata.updateOne(query,data,function(err,res){
        });
        Bookdata.find({"app_status":"pending"},function(err,result){
            if(err) throw err;
            res_2=result;
            if(result){
            res.render('admin',{res_2});
            }else
            res.send('No pending items');
        })    
    })

    pwdRouter.get('/borrow/:id',(req,res)=>{
        var id =req.params.id;
        console.log("free books before op");
        console.log(books.length);
        var item={
            user_id:res_1._id,
            book_id:id,
            status:"active"
        }
        var transaction=new Transactiondata(item);
        transaction.save();
        var query={ "_id":id };
        var data={ $set: { "status" : "borrowed" }};
        Bookdata.updateOne(query,data,function(err,res){
        });
        Bookdata.find({$and:[{ "app_status" : "approved" },{'status':"free"}]},function(err,result){
            if(err) throw err;
            if(result){
            books=result;
            res.render('user',{res_1,books});
            }

        })
    
    })

    pwdRouter.get('/mybooks',(req,res)=>{
        // 
        Bookdata.find({$and:[{ "owner_id" : res_1._id },{'status':"free"}]},function(err,result){
            if(err) throw err;
            if(result){
            mybooks=result;
            res.render('mybooks',{res_1,mybooks});
            }
        })
        

    });

    pwdRouter.get('/borrowedbooks',(req,res)=>{
        //res.render('borrowedbooks',{res_1,books});
        Transactiondata.find({$and:[{user_id:res_1._id},{status:'active'}]},function(err,result) {
            // b_id=res.book_id;
            // t_id=res._id;
            tran_length=result.length
            for(i=0;i<result.length;i++){

                bookidarr[i]=result[i].book_id;
                indexarr[i]=result[i]._id;
            }
            //loop to find book_name from book_id stored in bookidarr[]
            for(i=0;i<tran_length;i++)
            {
                Bookdata.findOne({_id:bookidarr[i]},function(err,result1){
                    booknamearr[i]=result1.title;
                    // console.log(booknamearr[i]);
                });

            }
            if(result){

                res.render('borrowedbooks',{res_1,bookidarr,indexarr,booknamearr});
                // res1 is the object containing current user login
                //bookidaddr is the array containing _id of books borrowed by user in books table
                //indexarr is the array of indexes in transaction table
                //booknamearr contains names of books user borrowed (for display only)
                //in borrowedbooks display booknamearr with a corresponding return button
                //once it is clicked send corresponding indexarr to the router then find the corresponding 
                //bookid from bookidarr here update status in books table transaction table and update the above three
                //arrays(by using the select command once again)  

            }

        })






    })

    pwdRouter.get('/delete/:id',(req,res)=>{
        var id =req.params.id;
        Bookdata.deleteOne({_id:id},function(req1,res1){
        });
        Bookdata.find({$and:[{ "owner_id" : res_1._id },{'status':"free"}]},function(err,result){
            if(err) throw err;
            if(result){
            mybooks=result;
            res.render('mybooks',{res_1,mybooks});
            }
        })
    });









    return pwdRouter;
}
module.exports=router;