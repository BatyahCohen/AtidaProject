import React, { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { client } from "../classes/client";
import MyContext from "../myContext";
import axios from "axios";
import { corona } from "../classes/corona";
import { useDispatch, useSelector } from "react-redux";
import { Checking } from "./checking";

export const UpdateClient1 = () => {
  let id = useParams().Id;
  
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

let dispatch=useDispatch()

    // פונקציה שתבדוק את תקינות הקלטים ושולחת לרשימות המקומיות
    const checking1=()=>
    {
      //שליחה לפונקציית בדיקת תקינות קלט
      if(!Checking(currentCoronaInfo,currentClient))
        return;

    updateClient(currentClient, currentClient?._id);
   
    axios.post(`http://localhost:1234/corona/updateCoronaInfo/${currentCoronaInfo?._id}`,currentCoronaInfo)
    .then((v)=>{dispatch({type: 'update', payload:currentCoronaInfo})});
    navigate('/')
  };

//הוספת יום למערך
const addDay=(newDate:Date)=>
{
  setCurrentCoronaInfo((prevInfo) => ({
    ...prevInfo,
    vaccineDate:[...prevInfo.vaccineDate, newDate]
  }));
}

const addManufacturer=(m:string,i:number)=>
{
  //כדי שלא עבור כל אות תתוסף למיקום הבא במערך נעתיק את תוכן המערך,ונוסיף תמיד למיקום המתקבל
  setCurrentCoronaInfo((prevInfo) => 
  {
    const updateVaccineManufacturer = prevInfo.vaccineManufacturer ? [...prevInfo.vaccineManufacturer] : [];
    updateVaccineManufacturer[i]=m; 
    return {
      ...prevInfo,
      vaccineManufacturer: updateVaccineManufacturer
    };
  })
}

  const [bool, setBool] = useState([currentCoronaInfo?.vaccineDate[0]?true:false, currentCoronaInfo?.vaccineDate[0]?true:false, currentCoronaInfo?.vaccineDate[1]?true:false, currentCoronaInfo?.vaccineDate[1]?true:false, currentCoronaInfo?.vaccineDate[2]?true:false, currentCoronaInfo?.vaccineDate[2]?true:false, currentCoronaInfo?.vaccineDate[3]?true:false]);
  const [bool2, setBool2] = useState(currentCoronaInfo?.positiveResultDate?true:false); 
  const [bool3, setBool3] = useState([false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false])

  const adding=(e:any,str:String)=>
   {
     switch(str)
     {
       case "Id":
       {
          currentClient.Id=e.target.value
           break;
       }
       case "name":
       {
         currentClient.name=e.target.value
             break;
       }
       case "city":
       {
         currentClient.city=e.target.value
             break;
       }
       case "street":
       {
         currentClient.street=e.target.value
               break;
       }
       case "houseNumber":
       {
         currentClient.houseNumber=e.target.value
           break;
       }
       case "birthday":
       {
         currentClient.birthday=new Date(e.target.value)
             break;
       }
       case "phone":
       {
         currentClient.phone=e.target.value
             break;
       }
       case "cellPhone":
       {
         currentClient.cellPhone=e.target.value
               break;
       }

       
       case "v1d":
       { 
       const newDate = new Date(e.target.value);
       setCurrentCoronaInfo((prevInfo) => ({
         ...prevInfo,
         vaccineDate: prevInfo.vaccineDate ? [...prevInfo.vaccineDate, newDate] : [newDate]
       }));
       
         setBool([true, false, false, false, false, false, false]);
             break;
       }
       case "v1m":
       {
         addManufacturer(e.target.value,0)
         setBool([true, true, false, false, false, false, false]);
             break;
       }
       case "v2d":
       {
         addDay(new Date(e.target.value))
         setBool([true, true, true, false, false, false, false]);
               break;
       }
       case "v2m":
       {
         addManufacturer(e.target.value,1)
         setBool([true, true, true, true, false, false, false]);
             break;
       }
       case "v3d":
       {
         addDay(new Date(e.target.value))
         setBool([true, true, true, true, true, false, false]);
             break;
       }
       case "v3m":
       {
         addManufacturer(e.target.value,2)
         setBool([true, true, true, true, true, true, false]);
               break;
       }
       case "v4d":
       {
         addDay(new Date(e.target.value))
         setBool([true, true, true, true, true, true, true]);
             break;
       }
       case "v4m":
       {
         addManufacturer(e.target.value,3)
             break;
       }
       case "positiveDate":
         {
           currentCoronaInfo.positiveResultDate=new Date(e.target.value)
             setBool2(true);
                 break;
         }
       case "recoveryDate":
       {
         currentCoronaInfo.recoveryDate=new Date(e.target.value)
               break;
       }
     }
   }

   const setView=(i:number)=>
   {
    setBool3(bool3.map((value, index) => index == i ? true : value));
  }

  return <div>
  <center>
  <form>   
    
  
   <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(0)}>edit</button></div><br/>
    {bool3[0] && <input  required  type="text" maxLength={9} onChange={(e)=>adding(e,"Id")}/>}<br/><br/>
    <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(1)}>edit</button></div><br/>
    {bool3[1] && <input required type="text" value={String(currentClient?.name)} onChange={(e)=>adding(e,"name")}/>}<br/><br/>
    <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(2)}>edit</button></div><br/>
    {bool3[2] && <input required type="text" value={String(currentClient?.city)} onChange={(e)=>adding(e,"city")}/>}<br/><br/>
    <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(3)}>edit</button></div><br/>
    {bool3[3] && <input required type="text" value={String(currentClient?.street)} onChange={(e)=>adding(e,"street")}/>}<br/><br/>
    <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(4)}>edit</button></div><br/>
    {bool3[4] && <input required type="number" value={String(currentClient?.houseNumber)} onChange={(e)=>adding(e,"houseNumber")}/>}<br/><br/>
    <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(5)}>edit</button></div><br/>
    {bool3[5] && <input required type="date" onChange={(e)=>adding(e,"birthday")}/>}<br/><br/>
    <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(6)}>edit</button></div><br/>
    {bool3[6] && <input required type="text" value={String(currentClient?.phone)} maxLength={9}  onChange={(e)=>adding(e,"phone")}/>}<br/><br/>
    <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(7)}>edit</button></div><br/>
    {bool3[7] && <input required type="text" maxLength={10} value={String(currentClient?.cellPhone)} onChange={(e)=>adding(e,"cellPhone")}/>}<br/><br/><br></br>
    
    
    <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(8)}>edit</button></div><br/>
    {bool3[8] && <input type="date" onChange={(e)=>adding(e,"v1d")} />}<br /><br />
     
    { bool[0] ?( <span>
      <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(9)}>edit</button></div><br/>
    {bool3[9] && <input  type="text" value={String(currentCoronaInfo?.vaccineManufacturer[0])} onChange={(e)=>adding(e,"v1m")} />}<br /><br /><br />
    </span>):null}
     
    { bool[1] ?( <span>  
      <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(10)}>edit</button></div><br/>
    {bool3[10] && <input  type="date" onChange={(e)=>adding(e,"v2d")} />}<br /><br />
    </span>):null}
    
    { bool[2] ?( <span>  
      <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(11)}>edit</button></div><br/>
    {bool3[11] && <input type="text" value={String(currentCoronaInfo?.vaccineManufacturer[1])} onChange={(e)=>adding(e,"v2m")} />}<br /><br /><br />
    </span>):null}
  
    { bool[3] ?( <span>  
      <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(12)}>edit</button></div><br/>
    {bool3[12] && <input  type="date" onChange={(e)=>adding(e,"v3d")} />}<br /><br />
    </span>):null}
  
    { bool[4] ?( <span>  
      <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(13)}>edit</button></div><br/>
    {bool3[13] && <input type="text" value={String(currentCoronaInfo?.vaccineManufacturer[2])} onChange={(e)=>adding(e,"v3m")} />}<br /><br /><br />
    </span>):null}
  
    { bool[5] ?( <span>  
      <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(14)}>edit</button></div><br/>
    {bool3[14] &&     <input type="date" onChange={(e)=>adding(e,"v4d")} />}<br /><br />
    </span>):null}
  
    { bool[6] ?( <span>  
      <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(15)}>edit</button></div><br/>
    {bool3[15] &&     <input type="text" value={String(currentCoronaInfo?.vaccineManufacturer[3])} onChange={(e)=>adding(e,"v4m")} />}<br /><br /> <br />
   </span>):null}
  
   <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(16)}>edit</button></div><br/>
    {bool3[16] &&     <input type="date" onChange={(e)=>adding(e,"positiveDate")} />}<br /><br />
  
    { bool2 ?( <span>  
      <div><b>Id: </b>{currentClient?.Id} <button onClick={()=>setView(17)}>edit</button></div><br/>
    {bool3[17] &&     <input type="date" onChange={(e)=>adding(e,"recoveryDate")} />}<br /><br />
    </span>):null}
  
    <input type="submit" value="Submit" className="btn" onClick={()=>checking1()}/>
   </form>
   
   </center>
      </div>

};
