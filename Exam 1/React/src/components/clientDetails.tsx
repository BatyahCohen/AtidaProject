import React, { useContext } from "react";
import MyContext from "../myContext";
import { client } from "../classes/client";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import { ShowCoronaInfo } from "./showCoronaInfo";
import { useDispatch } from "react-redux";
import axios from "axios";

export const ClientDetails = () => {
  let id = useParams().Id;
  let dispatch = useDispatch();
  //@ts-ignore
  let clientsList: Array<client> = useContext(MyContext).clients;
  let currentClient: client = clientsList?.filter((i: any) => i.Id == id)[0];

  //@ts-ignore
  const deleteClient = useContext(MyContext).deleteClient;

  let navigate = useNavigate();
  const deleteF = () => {
    deleteClient(currentClient?.Id);
    axios
      .delete(
        `http://localhost:1234/corona/deleteCoronaInfo/${currentClient?.Id}`
      )
      .then((v) => {
        dispatch({ type: "delete", payload: currentClient?.Id });
      });

    navigate("/");
  };

  return (
    <center>
      <div>
        <br />
        <table>
          <tr>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td>name: </td>
            <td>{currentClient?.name}</td>
            
          </tr>
          <tr>
            <td>Id: </td>
            <td>{currentClient?.Id}</td>
          </tr>
          <tr>
            <td>address:</td>
            <td>
              {currentClient?.city}, {currentClient?.street}
              {String(currentClient?.houseNumber)}
            </td>
          </tr>
          <tr>
            <td>birthday:</td>
            <td>{String(currentClient?.birthday).substring(0, 10)}</td>
          </tr>
          <tr>
            <td>phone: </td>
            <td>{currentClient?.phone}</td> 
          </tr>
          <tr>
            <td>cell phone: </td>
            <td>{currentClient?.cellPhone}</td>  
          </tr>
        </table>
        <br />
        <ShowCoronaInfo Id={currentClient?.Id}></ShowCoronaInfo>
        <br />
        <button onClick={() => deleteF()}> delete</button>
        <Link to={`/updateClient/${id}`}>
          <button>update</button>
        </Link>
      </div>
    </center>
  );
};
