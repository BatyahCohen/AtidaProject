import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddClient } from "./addClient";
import { ShowClients } from "./showClients";
import { ClientDetails } from "./clientDetails";
import { UpdateClient } from "./updateClient";
import Nav from "./nav";
import { AddClient2 } from "./addClient2";

export const Routing=()=>
{
    return( 
    <BrowserRouter>
    <Routes>  
        <Route path='/' element={<Nav/>}>
        <Route path='ShowClients' element={<ShowClients/>}></Route>
        <Route path='clientDetails/:Id' element={<ClientDetails/>}></Route>
        <Route path='addClient' element={<AddClient/>}></Route>
        <Route path='updateClient/:Id' element={<UpdateClient/>}></Route>
        </Route>
        {/* <Route path='/showCoronaInfo/:Id' element={<UpdateClient/>}></Route> */}
    </Routes>
    </BrowserRouter> 
    )
}
