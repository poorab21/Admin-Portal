import clientPromise from '../../../lib/mongo/index'

export default async function SSQueries(req,res){
    if(req.method === 'GET'){
        const client = await clientPromise
        const db = client.db('test')
        let grievances = []
        const collection = db.collection('seeker queries')
        const seeker_collection = db.collection('service seekers')
        const result  = await collection.find({}).toArray()

        for(let i = 0 ; i < result.length ; i++ ){
            const seeker = await seeker_collection.findOne({
                _id : result[i].customer
            })

            grievances.push({
                _id : result[i]._id ,
                email : result[i].message ,
                submission : result[i].submission ,
                person : seeker.firstname + ' ' + seeker.lastname
            })
        }

        res.json({
            success : true ,
            grievances : grievances
        })
    }
}