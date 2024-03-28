import React, { useContext, useEffect } from "react";
import { Link} from "react-router-dom";
import MyContext from "../myContext";
import { client } from "../classes/client";
import { useDispatch, useSelector } from "react-redux";
import { corona } from "../classes/corona";
import axios from "axios"

export const ShowClients = () => 
{
    //@ts-ignore
   let clientsList:Array<client> = useContext(MyContext).clients

  // טעינה ראשונית של נתוני הקורונה
   let coronaInfo:Array<corona>=useSelector((l:any)=>l.coronaInfo)
   const dispatch=useDispatch()
   useEffect(function()
   {
       if(coronaInfo.length==0)
       {
           axios.get('http://localhost:1234/corona/getAllCoronaInfo').
           then((v)=>{dispatch({type: 'getAll', payload:v.data})})
       }
   },[])
  
  return(
  <center>
    <div>
      <br/>
        {clientsList?.map((i:any)=>(
        <p id={i._id}>
            <div id={i._id}>{i.name}</div>
            <Link id={i._id} to={`/clientDetails/${i.Id}`}>Details</Link>
            <br/><br/>
        </p>))}
    </div>
  </center>
  )
};