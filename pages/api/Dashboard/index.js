import clientPromise from '../../../lib/mongo/index'

export default async function Dashboard(req,res){
    if(req.method === 'GET'){
        res.json({ success : true })
    }
}