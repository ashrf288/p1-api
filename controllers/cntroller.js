const mongoose = require('mongoose');
const Art = require('../modules/moudle');



mongoose.connect(process.env.MONGO_DB_URI);


let ArtSchema=mongoose.Schema({
    email:String,
    name:String,
    image:String,
    level:String
})



let ArtModal=mongoose.model('Art',ArtSchema);

let getData=(req,res)=>{
    let email=req.params.email;
    ArtModal.find({email:email}).then(resp=>{
        if(resp.length>0){res.json(resp)}
        else{res.json('no data found')}
    }
    )
}

let addData=(req,res)=>{
    let email=req.params.email;
    let {name,image,level}=req.body;
    let newArt=new ArtModal({
        email,name,image,level
    })
    newArt.save()
    res.send({msg:'added',result:newArt})
}
let update=(req,res)=>{
    let id=req.params.id;
    let data=req.body
    ArtModal.findByIdAndUpdate(id,{$set:data},{new:true}).then(resp=>{
        if(resp){res.json({msg:'updated',result:resp})}
        else{res.json('no id match')}
        
    })
}
let deleteData=(req,res)=>{
      let id=req.params.id;
      ArtModal.findByIdAndDelete(id).then(resp=>{
          if(resp){ res.json({msg:'delted',result:resp})}
          else{res.json('no id match')}
      })
}
module.exports={getData,addData,update,deleteData}