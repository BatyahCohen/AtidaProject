//טעינת המודול המאפשר חיבור למסד הנתונים
var mongoose=require('mongoose')
//הגדרת מבנה הטבלה שתישלף
var coronaModule=new mongoose.Schema(
{
    Id:String,
    vaccineDate:Array,
    vaccineManufacturer:Array,
    recoveryDate:Date,
    positiveResultDate:Date

})
//יצירת המודול אליו אנו טוענים את הגדרת מבנה הטבלה
var clients=mongoose.model("corona",coronaModule,"Corona")
//יצוא המודול
module.exports=clients
