//טעינת המודול המאפשר חיבור למסד הנתונים
var mongoose=require('mongoose')
//הגדרת מבנה הטבלה שתישלף
var clientModule=new mongoose.Schema(
{
    name:String,
    Id:String,
    city:String,
    street:String,
    houseNumber:Number,
    birthday:Date,
    phone:String,
    cellPhone:String
})
//יצירת המודול אליו אנו טוענים את הגדרת מבנה הטבלה
var clients=mongoose.model("clients",clientModule,"Clients")
//יצוא המודול
module.exports=clients
