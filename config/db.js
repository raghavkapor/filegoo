const mongoose=require('mongoose');
const env=require('dotenv');
env.config({path:'./.env'});
const DB=process.env.DATABASE;

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connection Successful')
}).catch((err)=>{
    console.log('connection unsuccessful');
})