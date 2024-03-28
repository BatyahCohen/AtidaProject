import axios from "axios";
import { MyProvider } from "./myContext";
import { useState, useEffect } from "react";
import "./bootstrap.css";
import "./style.css";
import { client } from "./classes/client";
import { Provider } from "react-redux";
import store from "./store/store";
import { Routing } from "./components/routing";

function App() 
{
  const [clients, setClients] = useState<Array<client>>([]);

  useEffect(()=> 
  {
    if(clients?.length==0)
      getAllClients()
    
  }, []);

  const getAllClients=()=>
  {
    axios.get('http://localhost:1234/clients/getAllClients')
      .then(i => setClients(i.data))
  }

  const addClient = (client: client) => {
    setClients(clients?.concat(client));
    axios
      .put("http://localhost:1234/clients/addClient", client)
      .then((i) => alert("משתמש התווסף בהצלחה"));
      getAllClients()
  };

  const updateClient = (client: client, Id: any) => 
  {
    let temp = clients?.filter((i:any) => i._id != Id);
    setClients(temp?.concat(client));
    axios
      .post(`http://localhost:1234/clients/updateClient/${Id}`, client)
      .then((i) => alert("משתמש עודכן בהצלחה"));

  };

  const deleteClient = ( Id: any) => 
  {
    setClients(clients?.filter((i:any) => i.Id != Id));
    axios
      .delete(`http://localhost:1234/clients/deleteClient/${Id}`)
      .then((i) => alert("משתמש נמחק בהצלחה"));
  };

  const transfer = 
  {
    clients: clients,
    addClient: addClient,
    updateClient: updateClient,
    deleteClient:deleteClient,
  };

  return (
    <div className="App">
      <MyProvider value={transfer}>
        <Provider store={store}>
          <Routing></Routing>
        </Provider>
      </MyProvider>
    </div>
  );
}

export default App;
