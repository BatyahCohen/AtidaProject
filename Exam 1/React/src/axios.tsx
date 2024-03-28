import axios from "axios";

export async function getAll()
{
    let response=await axios.get('http://localhost:1234/flowers/getAll')
    return response
}