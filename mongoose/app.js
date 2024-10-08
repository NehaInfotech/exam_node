const express =require('express')
const app=express()
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const friend=require('./modal/Friends')

mongoose.connect('mongodb://localhost:27017/neha')
.then((res)=>{
    console.log("sucsess");
})
.catch((err)=>{
console.log(err);

})

app.set('view engine','ejs')
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',async(req,res)=>{
    const allData=await friend.find()
    res.render('index',{allData})
})

app.post('/createdata',async(req,res)=>{
    console.log(req.body);
    const data =req.body
    await friend.create(data)

    res.redirect('/')
    
})

app.listen(4000)