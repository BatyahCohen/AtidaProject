import React, { useContext, useRef, useState } from "react";
import { client } from "../classes/client";
import MyContext from "../myContext";
import axios from "axios";
import { corona } from "../classes/corona";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Checking } from "./checking";

export const AddClient2=()=>
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
      
      navigate('/')
    }

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

   const [bool, setBool] = useState([false, false, false, false, false, false, false]);
   const [bool2, setBool2] = useState(false); 
   
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
          //setcurrentClient({...currentClient,city:e.target.value})
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
        
        setBool(bool.map((value, index) => index == 0 ? true : value));
        break;
        }
        case "v1m":
        {
          addManufacturer(e.target.value,0)
          setBool(bool.map((value, index) => index == 1 ? true : value));
          break;
        }
        case "v2d":
        {
          addDay(new Date(e.target.value))
          setBool(bool.map((value, index) => index == 2 ? true : value));
          break;
        }
        case "v2m":
        {
          addManufacturer(e.target.value,1)
          setBool(bool.map((value, index) => index == 3 ? true : value));
          break;
        }
        case "v3d":
        {
          addDay(new Date(e.target.value))
          setBool(bool.map((value, index) => index == 4 ? true : value));
          break;
        }
        case "v3m":
        {
          addManufacturer(e.target.value,2)
          setBool(bool.map((value, index) => index == 5 ? true : value));
          break;
        }
        case "v4d":
        {
          addDay(new Date(e.target.value))
          setBool(bool.map((value, index) => index == 6 ? true : value));
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

return <div>
<center>
<form>
<label>Id:</label><br/>
  <input  required  type="text" maxLength={9}  onChange={(e)=>adding(e,"Id")}/><br/><br/>
  <label>full name:</label><br/>
  <input required type="text"  onChange={(e)=>adding(e,"name")}/><br/><br/>
  <label>city:</label><br/>
  <input required type="text" onChange={(e)=>adding(e,"city")}/><br/><br/>
  <label>street:</label><br/>
  <input required type="text"  onChange={(e)=>adding(e,"street")}/><br/><br/>
  <label>house number:</label><br/>
  <input required type="number"  onChange={(e)=>adding(e,"houseNumber")}/><br/><br/>
  <label>birthday:</label><br/>
  <input required type="date"  onChange={(e)=>adding(e,"birthday")}/><br/><br/>
  <label>phone:</label><br/>
  <input required type="text" maxLength={9}  onChange={(e)=>adding(e,"phone")}/><br/><br/>
  <label>cell phone:</label><br/>
  <input required type="text" maxLength={10}  onChange={(e)=>adding(e,"cellPhone")}/><br/><br/><br></br>
  
  
  <label>vaccine 1 date:</label><br/> 
  <input type="date" onChange={(e)=>adding(e,"v1d")} /><br /><br />
   
  { bool[0] ?( <span>
  <label>vaccine 1 manufacturer:</label><br/>
  <input  type="text" onChange={(e)=>adding(e,"v1m")} /><br /><br /><br />
  </span>):null}
   
  { bool[1] ?( <span>  
  <label>vaccine 2 date:</label><br/>
  <input  type="date" onChange={(e)=>adding(e,"v2d")} /><br /><br />
  </span>):null}
  
  { bool[2] ?( <span>  
  <label>vaccine 2 manufacturer:</label><br/>
  <input type="text" onChange={(e)=>adding(e,"v2m")} /><br /><br /><br />
  </span>):null}

  { bool[3] ?( <span>  
  <label>vaccine 3 date:</label><br/>
  <input  type="date" onChange={(e)=>adding(e,"v3d")} /><br /><br />
  </span>):null}

  { bool[4] ?( <span>  
  <label>vaccine 3 manufacturer:</label><br/>
  <input type="text" onChange={(e)=>adding(e,"v3m")} /><br /><br /><br />
  </span>):null}

  { bool[5] ?( <span>  
  <label>vaccine 4 date:</label><br/>
  <input type="date" onChange={(e)=>adding(e,"v4d")} /><br /><br />
  </span>):null}

  { bool[6] ?( <span>  
  <label>vaccine 4 manufacturer:</label><br/>
  <input type="text" onChange={(e)=>adding(e,"v4m")} /><br /><br /> <br />
 </span>):null}

  <label>positive result date:</label><br/>
  <input type="date" onChange={(e)=>adding(e,"positiveDate")} /><br /><br />

  { bool2 ?( <span>  
  <label>recovery date:</label><br/>
  <input type="date" onChange={(e)=>adding(e,"recoveryDate")} /><br /><br />
  </span>):null}

  <input type="submit" value="Submit" className="btn" onClick={()=>checking1()}/>
 </form>
 
 </center>
    </div>
}