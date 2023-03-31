import { deleteCookie, hasCookie } from "cookies-next";

export default function logout(req,res){
    if(req.method === 'GET'){
        deleteCookie('token',{req,res})
        res.json({
            success : true
        })
    }
}