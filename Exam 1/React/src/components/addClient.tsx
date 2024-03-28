import React, { useContext, useRef, useState } from "react";
import { client } from "../classes/client";
import MyContext from "../myContext";
import axios from "axios";
import { AddCoronaInfo } from "./addCoronaInfo";
import { corona } from "../classes/corona";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Checking } from "./checking";

export const AddClient=()=>
{
//יצירת לקוח מקומי אליו יכנסו פרטי המשתמש החדש
    //@ts-ignore 
    const [currentClient,setcurrentClient]=useState<client>({})
 
    //פונקציית הוספה מהקונטקסט
    //@ts-ignore
   const addClient=useContext(MyContext).addClient
   
   //יצירת פרטי קורונה מקומיים אליהם יוכנסו פרטי הקורונה החדשים
   //@ts-ignore
   const [currentCoronaInfo, setCurrentCoronaInfo] = useState<corona>({});

   let dispatch=useDispatch()

   let navigate=useNavigate()

   // פונקציה שתבדוק את תקינות הקלטים ושולחת לרשימות המקומיות
   const checking1=()=>
   {
     //שליחה לפונקציית בדיקת תקינות קלט
     if(!Checking(currentCoronaInfo,currentClient))
       return;
        
     //הוספת תעודת זהות משתמש למידע הקורונה
     currentCoronaInfo.Id=currentClient?.Id;

     //שליחת המשתמש החדש למסד הנתונים ועדכון רשימה מקומית
     addClient(currentClient)

     //שליחה למסד הנתונים ועדכון המידע המקומי בסטור
     axios.put('http://localhost:1234/corona/addCoronaInfo',currentCoronaInfo)
     .then((v)=>{dispatch({type: 'add', payload:currentCoronaInfo})});
     
     // נצטרך לטעון מחדש את הנתונים_idעל מנת שלכל המשתנים יהיה 
     axios.get('http://localhost:1234/corona/getAllCoronaInfo').
     then((v)=>{dispatch({type: 'getAll', payload:v.data})})

     navigate('/')
   }

 //הוספת יום למערך
 const addDay=(newDate:Date,i:any)=>
 {
   setCurrentCoronaInfo((prevInfo) => ({
     ...prevInfo,
     vaccineDate: prevInfo.vaccineDate ? [...prevInfo.vaccineDate, newDate] : [newDate]
   }));

   setBool(bool.map((value, index) => index == (i) ? true : value));
 }

 const addManufacturer=(m:string,i:number,j:number)=>
 { 
   //כדי שלא עבור כל אות תתוסף למיקום הבא במערך נעתיק את תוכן המערך,ונוסיף תמיד למיקום המתקבל
   setCurrentCoronaInfo((prevInfo) => 
   {
     const updateVaccineManufacturer = prevInfo.vaccineManufacturer ? [...prevInfo.vaccineManufacturer] : [];
     updateVaccineManufacturer[j]=m; 
     return {
       ...prevInfo,
       vaccineManufacturer: updateVaccineManufacturer
     };
   })
   //שינוי המיקום במערך לאמת כדי שתיבת הקלט הבאה תוכל להיפתח
   setBool(bool.map((value, index) => index == (i) ? true : value));
 }
 
const positiveDate=(d:Date)=>
{
   setCurrentCoronaInfo({...currentCoronaInfo,positiveResultDate:d})
    setBool2(true);  
}

  const [bool, setBool] = useState([false, false, false, false, false, false, false]);
  const [bool2, setBool2] = useState(false); 


return <div>
<center>
<form>
<label>Id:</label><br/>
  <input  required type="text" maxLength={9}  onChange={(e)=>setcurrentClient({...currentClient,Id:e.target.value})}/><br/><br/>
  <label>full name:</label><br/>
  <input required type="text"  onChange={(e)=>setcurrentClient({...currentClient,name:e.target.value})}/><br/><br/>
  <label>city:</label><br/>
  <input required type="text" onChange={(e)=>setcurrentClient({...currentClient,city:e.target.value})}/><br/><br/>
  <label>street:</label><br/>
  <input required type="text"  onChange={(e)=>setcurrentClient({...currentClient,street:e.target.value})}/><br/><br/>
  <label>house number:</label><br/>
  <input required type="number"  onChange={(e)=>setcurrentClient({...currentClient,houseNumber:parseInt(e.target.value)})}/><br/><br/>
  <label>birthday:</label><br/>
  <input required type="date"  onChange={(e)=>setcurrentClient({...currentClient,birthday:new Date(e.target.value)})}/><br/><br/>
  <label>phone:</label><br/>
  <input required type="text" maxLength={9}  onChange={(e)=>setcurrentClient({...currentClient,phone:e.target.value})}/><br/><br/>
  <label>cell phone:</label><br/>
  <input required type="text" maxLength={10} minLength={10} onChange={(e)=>setcurrentClient({...currentClient,cellPhone:e.target.value})}/><br/><br/><br></br>
  

  <label>positive result date:</label><br/>
  <input type="date" onChange={(e)=>positiveDate(new Date(e.target.value))} /><br /><br />
  
{ bool2 ?( <span>  
  <label>recovery date:</label><br/>
  <input type="date" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, recoveryDate: new Date(e.target.value)})} /><br /><br /> 
  </span>):null}
<br/>
  <label>vaccine 1 date:</label><br/> 
  <input type="date" onChange={(e)=>addDay(new Date(e.target.value),0)} /><br /><br />
   
  { bool[0] ?( <span>
  <label>vaccine 1 manufacturer:</label><br/>
  <input  type="text" onChange={(e)=>addManufacturer(e.target.value,1,0)} /><br /><br /><br />
  </span>):null}
   
  { bool[1] ?( <span>  
  <label>vaccine 2 date:</label><br/>
  <input  type="date" onChange={(e)=>addDay(new Date(e.target.value),2)} /><br /><br />
  </span>):null}
  
  { bool[2] ?( <span>  
  <label>vaccine 2 manufacturer:</label><br/>
  <input type="text" onChange={(e)=>addManufacturer(e.target.value,3,1)} /><br /><br /><br />
  </span>):null}

  { bool[3] ?( <span>  
  <label>vaccine 3 date:</label><br/>
  <input  type="date" onChange={(e)=>addDay(new Date(e.target.value),4)} /><br /><br />
  </span>):null}

  { bool[4] ?( <span>  
  <label>vaccine 3 manufacturer:</label><br/>
  <input type="text" onChange={(e)=>addManufacturer(e.target.value,5,2)}/><br /><br /><br />
  </span>):null}

  { bool[5] ?( <span>  
  <label>vaccine 4 date:</label><br/>
  <input type="date" onChange={(e)=>addDay(new Date(e.target.value),6)} /><br /><br />
  </span>):null}

  { bool[6] ?( <span>  
  <label>vaccine 4 manufacturer:</label><br/>
  <input type="text" onChange={(e)=>addManufacturer(e.target.value,7,3)} /><br /><br /> <br />
 </span>):null}
 
 <input type="submit" value="Submit" className="buton" onClick={()=>checking1()}/>

  </form>
  </center>
     </div>
return <></>
}