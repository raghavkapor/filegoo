const express=require('express');
const env=require('dotenv');
const path=require('path');
const app=express();
env.config({path:'./.env'});

const PORT=process.env.PORT;
require('./config/db');

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

app.use(express.json())

app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));

app.use('/api/files',require('./router/files'));
app.use('/files',require('./router/show'));
app.use('/files/download',require('./router/download'));

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname, '/views', 'index.html'));
})
app.listen(PORT,()=>{
    console.log(`hy this is port no. ${PORT}`);
})
