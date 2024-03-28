//express טעינת המודול 
var express=require('express')
//טעינת המודול המאפשר ביזור של האפליקציה
var router=express.Router()

const {ObjectId}=require('mongodb')

//טעינת מודול הקורונה
var coronaModule=require('../Models.js/coronaModule')

//שליפת כל נתוני קורונה
router.get('/getAllCoronaInfo',(req,res)=>{
    let clientId=req.params.Id;
    res.status(200,{'Content-Type':'application/json'})
    coronaModule.find({})
    .then((data)=>{res.json(data);})
    .catch((err)=>{console.log(err)});
});

// שליפת נתוני  קורונה עפ"י קוד משתמש
router.get('/getCoronaInfoById/Id',(req,res)=>{
    let clientId=req.params.Id;
    res.status(200,{'Content-Type':'application/json'})
    coronaModule.find({id:clientId})
    .then((data)=>{res.json(data);})
    .catch((err)=>{console.log(err)});
});

//הוספת פרטי קורונה
router.put('/addCoronaInfo',(req,res)=>{
    let ToAdd=req.body
    coronaModule.create(ToAdd)
        .then((data)=>{res.json(data);})
        .catch((err)=>{console.log(err)});
})

//עדכון פרטי קורונה
router.post('/updateCoronaInfo/:Id',(req,res)=>{
    let IdFromClient=req.params.Id;
    let Id=new ObjectId(IdFromClient);
    let updateData=req.body;
    coronaModule.findByIdAndUpdate(Id,updateData)
    .then((data)=>{res.json(data);})
    .catch((err)=>{console.log(err)});
})

//מחיקת פרטי קורונה
router.delete('/deleteCoronaInfo/:Id',(req,res)=>{
    let idFromClient=req.params.Id
    res.status(200,{'Content-Type':'application/json'})
    coronaModule.deleteOne({Id:idFromClient})
    .then((data)=>{res.json(data)})
    .catch((err)=>{console.log(err)});
})

//router-יצוא ה
module.exports=router
