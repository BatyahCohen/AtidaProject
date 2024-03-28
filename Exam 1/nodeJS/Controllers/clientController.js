//express טעינת המודול 
var express=require('express')
//טעינת המודול המאפשר ביזור של האפליקציה
var router=express.Router()

//טעינת המודול של הלקוחות
var clientModule=require('../Models.js/clientModule')

const {ObjectId}=require('mongodb')

//(שליפת נתוני כל הלקוחות (ללא פרטי קורונה
router.get('/getAllClients',(req,res)=>{
    res.status(200,{'Content-Type':'application/json'})
    clientModule.find({})
    .then((data)=>{res.json(data);})
    .catch((err)=>{console.log(err)});
});

//הוספת משתמש (ללא פרטי קורונה)
router.put('/addClient',(req,res)=>{
    let ToAdd=req.body
    clientModule.create(ToAdd)
        .then((data)=>{res.json(data);})
        .catch((err)=>{console.log(err)});
})

//עדכון משתמש (ללא פרטי קורונה)
router.post('/updateClient/:Id',(req,res)=>{
    let IdFromClient=req.params.Id;
    let Id=new ObjectId(IdFromClient);
    let updateData=req.body;
    clientModule.findByIdAndUpdate(Id,updateData)
    .then((data)=>{res.json(data);})
    .catch((err)=>{console.log(err)});
})

//מחיקת משתמש (ללא פרטי קורונה)
router.delete('/deleteClient/:Id',(req,res)=>{
    let IdFromClient=req.params.Id
    res.status(200,{'Content-Type':'application/json'})
    clientModule.deleteOne({Id:IdFromClient})
    .then((data)=>{res.json(data);})
    .catch((err)=>{console.log(err)});
})

//router-יצוא ה
module.exports=router