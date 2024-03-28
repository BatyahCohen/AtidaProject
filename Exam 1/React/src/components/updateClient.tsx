import React, { useContext, useRef, useState } from "react";
import { client } from "../classes/client";
import MyContext from "../myContext";
import axios from "axios";
import { AddCoronaInfo } from "./addCoronaInfo";
import { corona } from "../classes/corona";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Checking } from "./checking";

export const UpdateClient=()=>
{
  let id = useParams().Id;
  let dispatch=useDispatch()
  let navigate=useNavigate()

  //@ts-ignore
  let clientsList: Array<client> = useContext(MyContext).clients;
  const [currentClient, setcurrentClient] = useState<client>(
    clientsList?.filter((i: any) => i.Id == id)[0]
  );

  //@ts-ignore
  const updateClient = useContext(MyContext).updateClient;
  
  //@ts-ignore
  let coronaInfoList:Array<corona> = useSelector((state) => state.coronaInfo);
  const [currentCoronaInfo, setCurrentCoronaInfo] = useState<corona>(
    coronaInfoList.filter((item:any) => item.Id == id)[0]
  );


   // פונקציה שתבדוק את תקינות הקלטים ושולחת לרשימות המקומיות
   const checking1=()=>
   {
     //שליחה לפונקציית בדיקת תקינות קלט
     if(!Checking(currentCoronaInfo,currentClient))
       return;


     //שליחת המשתמש המעודכן למסד הנתונים ועדכון רשימה מקומית
     updateClient(currentClient,currentClient?._id)

     //שליחה למסד הנתונים ועדכון המידע המקומי בסטור
     axios.post(`http://localhost:1234/corona/updateCoronaInfo/${currentCoronaInfo?._id}`,currentCoronaInfo)
     .then((v)=>{dispatch({type: 'update', payload:currentCoronaInfo})});
     
     navigate('/')
   }

 //עדכון יום במערך
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
const setView=(e:any,i:number)=>
{
  debugger
  e.preventDefault();
 setBool3(bool3.map((value, index) => index == i ? true : value));
}

const [bool, setBool] = useState([currentCoronaInfo?.vaccineDate[0]?true:false, currentCoronaInfo?.vaccineDate[0]?true:false, currentCoronaInfo?.vaccineDate[1]?true:false, currentCoronaInfo?.vaccineDate[1]?true:false, currentCoronaInfo?.vaccineDate[2]?true:false, currentCoronaInfo?.vaccineDate[2]?true:false, currentCoronaInfo?.vaccineDate[3]?true:false]);
const [bool2, setBool2] = useState(currentCoronaInfo?.positiveResultDate?true:false); 
const [bool3, setBool3] = useState([false,false,false,false,false,false,false,false,false,false,false])

debugger
return <div>
<center>
<form>

  <label>full name:</label><br/>
  <input required type="text" value={String(currentClient?.name)} onChange={(e)=>setcurrentClient({...currentClient,name:e.target.value})}/><br/><br/>
  <label>city:</label><br/>
  <input required type="text" value={String(currentClient?.city)} onChange={(e)=>setcurrentClient({...currentClient,city:e.target.value})}/><br/><br/>
  <label>street:</label><br/>
  <input required type="text" value={String(currentClient?.street)} onChange={(e)=>setcurrentClient({...currentClient,street:e.target.value})}/><br/><br/>
  <label>house number:</label><br/>
  <input required type="number"value={String(currentClient?.houseNumber)}  onChange={(e)=>setcurrentClient({...currentClient,houseNumber:parseInt(e.target.value)})}/><br/><br/>
  <label>birthday:</label><br/>
  <div>{String(currentClient?.birthday).substring(0,10)}          <button onClick={(e)=>setView(e,0)}>edit</button></div>
  {bool3[0] &&<input required type="date" value={String()} onChange={(e)=>setcurrentClient({...currentClient,birthday:new Date(e.target.value)})}/>}<br/><br/>
  <label>phone:</label><br/>
  <input required type="text" value={String(currentClient?.phone)} maxLength={9}  onChange={(e)=>setcurrentClient({...currentClient,phone:e.target.value})}/><br/><br/>
  <label>cell phone:</label><br/>
  <input required type="text" value={String(currentClient?.cellPhone)} maxLength={10} minLength={10} onChange={(e)=>setcurrentClient({...currentClient,cellPhone:e.target.value})}/><br/><br/><br></br>
  

  <label>positive result date:</label><br/>
  <div>{bool2 && <p>{String(currentClient?.birthday).substring(0,10)} </p>}           <button onClick={(e)=>setView(e,1)}>edit</button></div>
  {bool3[1] &&<input type="date" onChange={(e)=>positiveDate(new Date(e.target.value))} />}<br /><br />
  
  
{ bool2 ?( <span>  
  <label>recovery date:</label><br/>
  <div>{currentCoronaInfo?.recoveryDate ? <p>{String(currentCoronaInfo?.recoveryDate).substring(0,10)}</p>:null}          <button onClick={(e)=>setView(e,2)}>edit</button></div>
  {bool3[2] &&
  <input type="date" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, recoveryDate: new Date(e.target.value)})} />}<br /><br /> 
  </span>):null}
   
  
<br/>
  <label>vaccine 1 date:</label><br/> 
  <div>{bool[0] &&<p>{String(currentCoronaInfo?.vaccineDate[0]).substring(0,10)}</p> }          <button onClick={(e)=>setView(e,3)}>edit</button></div>
  {bool3[3] &&
  <input type="date" onChange={(e)=>addDay(new Date(e.target.value),0)} />}<br /><br />
   
  { bool[0] ?( <span>
  <label>vaccine 1 manufacturer:</label><br/>
  <div>{String(currentCoronaInfo?.vaccineManufacturer[0]).substring(0,10)}          <button onClick={(e)=>setView(e,4)}>edit</button></div>
  {bool3[4] &&
  <input  type="text" onChange={(e)=>addManufacturer(e.target.value,1,0)} />}<br /><br /><br />
  </span>):null}
   
  { bool[1] && <span>  
  <label>vaccine 2 date:</label><br/>
  <div>{bool[2] &&<p>{String(currentCoronaInfo?.vaccineDate[1]).substring(0,10)}</p> }         <button onClick={(e)=>setView(e,5)}>edit</button></div>
  {bool3[5] &&
  <input  type="date" onChange={(e)=>addDay(new Date(e.target.value),2)} />}<br /><br />
  </span>}
  
  { bool[2] ?( <span>  
  <label>vaccine 2 manufacturer:</label><br/>
  <div>{String(currentCoronaInfo?.vaccineManufacturer[1]).substring(0,10)}          <button onClick={(e)=>setView(e,6)}>edit</button></div>
  {bool3[6] &&
  <input type="text" onChange={(e)=>addManufacturer(e.target.value,3,1)} />}<br /><br /><br />
  </span>):null}

  { bool[3] ?( <span>  
  <label>vaccine 3 date:</label><br/>
  <div>{bool[4] &&<p>{String(currentCoronaInfo?.vaccineDate[2]).substring(0,10)}</p> }           <button onClick={(e)=>setView(e,7)}>edit</button></div>
  {bool3[7] &&
  <input  type="date" onChange={(e)=>addDay(new Date(e.target.value),4)} />}<br /><br />
  </span>):null}

  { bool[4] ?( <span>  
  <label>vaccine 3 manufacturer:</label><br/>
  <div>{String(currentCoronaInfo?.vaccineManufacturer[2]).substring(0,10)}          <button onClick={(e)=>setView(e,8)}>edit</button></div>
  {bool3[8] &&
  <input type="text" onChange={(e)=>addManufacturer(e.target.value,5,2)}/>}<br /><br /><br />
  </span>):null}

  { bool[5] ?( <span>  
  <label>vaccine 4 date:</label><br/>
  <div>{bool[6] &&<p>{String(currentCoronaInfo?.vaccineDate[3]).substring(0,10)}</p> }           <button onClick={(e)=>setView(e,9)}>edit</button></div>
  {bool3[9] &&
  <input type="date" onChange={(e)=>addDay(new Date(e.target.value),6)} />}<br /><br />
  </span>):null}

  { bool[6] ?( <span>  
  <label>vaccine 4 manufacturer:</label><br/>
  <div>{String(currentCoronaInfo?.vaccineManufacturer[3]).substring(0,10)}          <button onClick={(e)=>setView(e,10)}>edit</button></div>
  {bool3[10] &&
  <input type="text" onChange={(e)=>addManufacturer(e.target.value,7,3)} />}<br /><br /> <br />
 </span>):null}

 <input type="submit" value="Submit" className="buton" onClick={()=>checking1()}/>
  </form>
 
  </center>
     </div>
return <></>
}