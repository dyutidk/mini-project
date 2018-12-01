const express =require('express');
const chalk=require('chalk');
const path=require('path');

var test=0

const addRouter=require('./src/routes/addRouter')(test);
const pwdRouter=require('./src/routes/pwdRouter')(test);

var app=new express();

app.use(express.static(path.join(__dirname,'/public')));
app.use('/signup',addRouter);
app.use('/check',pwdRouter);



app.set('views','./src/views');
app.set('view engine','ejs');



app.get('/',function(req,res){
    res.render('index');
});



app.listen(3000,function(){
    console.log('listening to port '+chalk.green('3000'));
})