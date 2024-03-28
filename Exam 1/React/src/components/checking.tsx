import { client } from "../classes/client"
import { corona } from "../classes/corona"
import React from "react"

export const  Checking=(corona:corona,client:client)=>
{ 
    const IdCheking=()=>
  {
      if (client?.Id.length !== 9)
      return false;

      if (isNaN(parseInt(String(client?.Id)))) 
        return false;
  
      const IdArray = client?.Id.split('').map(Number);
  
      let sum = 0;
      for (let i = 0; i < 9; i++) 
      {
          let x = IdArray[i];
          if (i % 2 ==1) 
          {
            x *= 2;
            if (x > 9) 
                x -= 9;           
          } 
          sum += x;
      }
      return sum % 10 == 0;  
  }

      if(client?.Id=="" ||client?.name==""|| client?.city==""||client?.street==""||client?.houseNumber==0||client?.birthday==null||client?.cellPhone==""||client?.phone=="")
      {
        alert("Fill in all field")
        return false
      }

      if (!/^(0\d{2}-?\d{7})$/.test(String(client?.cellPhone)))
      {
        alert("Please enter a correct cell phone in the appropriate fields");
        return false;
      }

      if(!/^(0\d{1,2}-?\d{7})$/.test(String(client?.phone))) 
      {
        alert("Please enter a correct phone in the appropriate fields");
        return false;
      }
      if ( !/^[a-zA-Zא-ת\s]+$/.test(String(client?.street))||!/^[a-zA-Zא-ת\s]+$/.test(String(client?.city))||!/^[a-zA-Zא-ת\s]+$/.test(String(client?.name))) 
      {
        alert("Please enter letters in the appropriate fields");
        return false;
      }
      if(!IdCheking())
      {
        alert("ID is invalid");
        return false;
      }
      if(corona?.recoveryDate<corona?.positiveResultDate)
      {
        alert("Times for receiving a positive answer and recovery are not normal")
        return false
      }
    return true
}