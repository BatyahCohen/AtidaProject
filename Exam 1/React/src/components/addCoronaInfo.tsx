import React, { useRef, useState } from "react";
import { corona } from "../classes/corona";
import { useDispatch } from "react-redux";
import axios from "axios";

export const AddCoronaInfo=()=>
{
    //@ts-ignore
   // const [currentCoronaInfo,setCurrentCoronaInfo]=useState<corona>({})
   const [currentCoronaInfo, setCurrentCoronaInfo] = useState<corona>({
});
    let dispatch=useDispatch()
  
    const add=()=>
    {
      axios.put('http://localhost:1234/corona/addCoronaInfo',currentCoronaInfo)
        .then((v)=>{dispatch({type: 'add', payload:currentCoronaInfo})});
    }

    let vd1:any=useRef(null)
    let vd2:any=useRef(null)
    let vd3:any=useRef(null)
    let vd4:any=useRef(null)
    let vm1:any=useRef(null)
    let vm2:any=useRef(null)
    let vm3:any=useRef(null)
    let vm4:any=useRef(null)
    let rd:any=useRef(null)
    let prd:any=useRef(null)

    return <center>
                <form>
                <label>vaccine 1 date:</label>
                <input   ref={vd1} type="date" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, vaccineDate: [...currentCoronaInfo.vaccineDate.slice(0, 1), new Date(e.target.value), ...currentCoronaInfo.vaccineDate.slice(2)]})} /><br /><br />
                <label>vaccine 2 date:</label>
                <input   ref={vd2} type="date" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, vaccineDate: [...currentCoronaInfo.vaccineDate.slice(0, 2), new Date(e.target.value), ...currentCoronaInfo.vaccineDate.slice(3)]})} /><br /><br />
                <label>vaccine 3 date:</label>
                <input   ref={vd3} type="date" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, vaccineDate: [...currentCoronaInfo.vaccineDate.slice(0, 3), new Date(e.target.value), currentCoronaInfo.vaccineDate[3]]})} /><br /><br />
                <label>vaccine 4 date:</label>
                <input   ref={vd4} type="date" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, vaccineDate: [new Date(e.target.value), ...currentCoronaInfo.vaccineDate.slice(1)]})} /><br /><br />
                <label>vaccine 1 manufacturer:</label>
                <input   ref={vm1} type="text" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, vaccineManufacturer: [...currentCoronaInfo.vaccineManufacturer.slice(0, 1), e.target.value, ...currentCoronaInfo.vaccineManufacturer.slice(2)]})} /><br /><br />
                <label>vaccine 2 manufacturer:</label>
                <input   ref={vm2} type="text" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, vaccineManufacturer: [...currentCoronaInfo.vaccineManufacturer.slice(0, 2), e.target.value, ...currentCoronaInfo.vaccineManufacturer.slice(3)]})} /><br /><br />
                <label>vaccine 3 manufacturer:</label>
                <input   ref={vm3} type="text" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, vaccineManufacturer: [...currentCoronaInfo.vaccineManufacturer.slice(0, 3), e.target.value, currentCoronaInfo.vaccineManufacturer[3]]})} /><br /><br />
                <label>vaccine 4 manufacturer:</label>
                <input   ref={vm4} type="text" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, vaccineManufacturer: [e.target.value, ...currentCoronaInfo.vaccineManufacturer.slice(1)]})} /><br /><br />
                <label>recovery date:</label>
                <input   ref={rd} type="date" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, recoveryDate: new Date(e.target.value)})} /><br /><br />
                <label>positive result date:</label>
                <input   ref={prd} type="date" onChange={(e) => setCurrentCoronaInfo({...currentCoronaInfo, positiveResultDate: new Date(e.target.value)})} /><br /><br />
                <input type="submit" value="Submit" onClick={()=>add()}/>
            </form>
        </center>
            
    {/* <form>
        <label>vaccine 1 date:</label>
        <input   ref={vd1} type="date"  onChange={(e)=>setCurrentCoronaInfo({...currentCoronaInfo,vaccineDate[0]:new Date(e.target.value)})}/><br/><br/>
        <label>vaccine 2 date:</label>
        <input   ref={vd1} type="date"  onChange={(e)=>setCurrentCoronaInfo({...currentCoronaInfo,vaccineDate[1]:new Date(e.target.value)})}/><br/><br/>
        <label>vaccine 3 date:</label>
        <input   ref={vd1} type="date"  onChange={(e)=>setCurrentCoronaInfo({...currentCoronaInfo,vaccineDate[2]:new Date(e.target.value)})}/><br/><br/>
        <label>vaccine 4 date:</label>
        <input   ref={vd1} type="date"  onChange={(e)=>setCurrentCoronaInfo({...currentCoronaInfo,vaccineDate[3]:new Date(e.target.value)})}/><br/><br/>
        <label>vaccine 1 manufacturer:</label>
        <input   ref={vd1} type="date"  onChange={(e)=>setCurrentCoronaInfo({...currentCoronaInfo,vaccineManufacturer[0]:e.target.value})}/><br/><br/>
        <label>vaccine 2 manufacturer:</label>
        <input   ref={vd1} type="date"  onChange={(e)=>setCurrentCoronaInfo({...currentCoronaInfo,vaccineManufacturer[1]:e.target.value})}/><br/><br/>
        <label>vaccine 3 manufacturer:</label>
        <input   ref={vd1} type="date"  onChange={(e)=>setCurrentCoronaInfo({...currentCoronaInfo,vaccineManufacturer[2]:e.target.value})}/><br/><br/>
        <label>vaccine 4 manufacturer:</label>
        <input   ref={vd1} type="date"  onChange={(e)=>setCurrentCoronaInfo({...currentCoronaInfo,vaccineManufacturer[3]:e.target.value})}/><br/><br/>
        <label>recovery date:</label>
        <input   ref={rd} type="date"  onChange={(e)=>setCurrentCoronaInfo({...currentCoronaInfo,recoveryDate:new Date(e.target.value)})}/><br/><br/>
        <label>positive result date:</label>
        <input   ref={rd} type="date"  onChange={(e)=>setCurrentCoronaInfo({...currentCoronaInfo,positiveResultDate:new Date(e.target.value)})}/><br/><br/>
    </form> */}       
}
