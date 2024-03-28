import React from "react";
import { corona } from "../classes/corona";
import { useSelector} from "react-redux";
import { useParams } from "react-router-dom";

export const ShowCoronaInfo = (props:any) => 
{
 let id=props.Id
  
 //שימוש בסטור
 let coronaInfo:Array<corona>=useSelector((l:any)=>l.coronaInfo)
 
 //משתמש נוכחי
 let currentCoronaInfo:any=coronaInfo?.filter((i:any)=>i.Id==id)[0]

 return( 
    <center>
      {currentCoronaInfo?.vaccineDate[0] && (<div><b> First vaccine</b></div>)}
      {currentCoronaInfo?.vaccineDate[0] && (<div>date: {String(currentCoronaInfo?.vaccineDate[0]).substring(0, 10)}</div>)}
      {currentCoronaInfo?.vaccineManufacturer[0] && (<div>manufacturer: {String(currentCoronaInfo?.vaccineManufacturer[0]).substring(0, 10)}</div>)}
      {currentCoronaInfo?.vaccineDate[1] && (<div><b>Second vaccine</b></div>)}
      {currentCoronaInfo?.vaccineDate[1] && (<div>date: {String(currentCoronaInfo?.vaccineDate[1]).substring(0, 10)} </div>)}
      {currentCoronaInfo?.vaccineManufacturer[1] && (<div>manufacturer: {String(currentCoronaInfo?.vaccineManufacturer[1]).substring(0, 10)}</div>)}
      {currentCoronaInfo?.vaccineDate[2] && (<div><b>Third vaccine</b></div>)}
      {currentCoronaInfo?.vaccineDate[2] && (<div>date: {String(currentCoronaInfo?.vaccineDate[2]).substring(0, 10)}</div>)}
      {currentCoronaInfo?.vaccineManufacturer[2] && (<div>manufacturer: {String(currentCoronaInfo?.vaccineManufacturer[2]).substring(0, 10)}</div>)}
      {currentCoronaInfo?.vaccineDate[3] && (<div><b>Fourth vaccine</b></div>)}
      {currentCoronaInfo?.vaccineDate[3]&& (<div>date: {String(currentCoronaInfo?.vaccineDate[3]).substring(0, 10)} </div>)}
      {currentCoronaInfo?.vaccineManufacturer[3] && (<div>manufacturer: {String(currentCoronaInfo?.vaccineManufacturer[3]).substring(0, 10)}</div>)}<br></br>
      {currentCoronaInfo?.positiveResultDate && (<div>positive resultDate: {String(currentCoronaInfo?.positiveResultDate).substring(0, 10)}</div>)}
      {currentCoronaInfo?.recoveryDate&& (<div>recovery date: {String(currentCoronaInfo?.recoveryDate).substring(0, 10)}</div>)}
  </center>
)
};