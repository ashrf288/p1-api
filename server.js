const express = require('express');
const app=express();
require('dotenv').config();
const Art=require('./modules/moudle')
const axios = require('axios');
const {getData,addData,update,deleteData}=require('./controllers/cntroller')
app.use(express.json());
const PORT=process.env.PORT;


app.get('/',(req,res)=>{
    let data=[]
    axios.get(process.env.BASE_URI).then(resp=>{
        resp.data.map(ele=>{
          let newArt=new Art(ele);
          data.push(newArt);
        })
        res.json(data);
    })
})

app.get('/user/:email',getData)
app.post('/addData/:email',addData)
app.put('/addData/:id',update)
app.delete('/delete/:id',deleteData)
app.listen(PORT,()=>console.log(`listiniing on port ${PORT}`))