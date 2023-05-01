import { hasCookie } from 'cookies-next'

export default async function checkCookie(req,res){
    if(req.method === 'GET'){
        hasCookie('token',{req,res}) ? res.json({
            success : true
        }) : res.json({
            success : false
        })
    }
}