const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/BookBarterDB");
const Schema=mongoose.Schema;
var book_schema=new Schema({
    title:String,
    desc:String,
    status:String,
    app_status:String,
    owner_id:String,
    borr_id:String

});
var bookdata=mongoose.model('book-data',book_schema);
module.exports=bookdata;