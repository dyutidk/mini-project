const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:2017/BookBarterDB");
const Schema=mongoose.Schema;
var tran_schema=new Schema({
    user_id:String,
    book_id:String,
    status:String

});

var transaction=mongoose.model('transaction',tran_schema); 
module.exports=transaction;