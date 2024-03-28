//טעינת מודול המאפשר יצירת שרת
var express=require('express')
//יצירת מופע מסוג המשתנה אליו טענו את המודול
var app=express()
const { acceptsLanguage } = require('express/lib/request')

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//HTTP טעינת מודול המאפשר לשרת לקבל בקשות 
let cors=require('cors')
//שימוש במודול
app.use(cors())

//טעינת מודול המאפשר קבלת מידע מהמשתמש
var bodyParser=require('body-parser')
// שימוש במודול
app.use(bodyParser.json())

//טעינת קונטרולר משתמשים
var clientController=require('./Controllers/clientController')
//ניתוב כללי לקונרולר משתמשים
app.use('/clients',clientController)

//טעינת קונטרולר קורונה
var coronaController=require('./Controllers/coronaController')
//ניתוב כללי לקונרולר קורונה
app.use('/corona',coronaController)

//טעינת המודול המאפשר חיבור למסד הנתונים
var mongoose=require('mongoose')
//חיבור למסד הנתונים
mongoose.connect("mongodb://localhost:27017/AtidaProject", { useNewUrlParser: true, useUnifiedTopology: true })
//יצירת משתנה שיכיל את מסד הנתונים
var db=mongoose.connection

//פתיחת מסד הנתונים
db.on('open',()=>{
    console.log("data base is open!!")
})

//טעינת מודול המטפל בניתובים
var path=require('path')
//  שתהיה מוכרת גם בלי הפניה ישירה אליה public יצירת תקיית 
app.use(express.static(path.join(__dirname,'public')))

//יצירת השרת
app.listen(1234,()=>{
    console.log("running!!!")
})