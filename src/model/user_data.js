const mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/BookBarterDB");
const Schema=mongoose.Schema;
var user_schema=new Schema({
    name:String,
    mail:String,
    password:String
});

var userdata=mongoose.model('user-data',user_schema);
module.exports=userdata;