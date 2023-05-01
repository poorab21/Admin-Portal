import axios from "axios";

export async function checkCookie(){
    const response = await axios.get('http://localhost:3000/api/checkCookie')
    return response.data.success  
}