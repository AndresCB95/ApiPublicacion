const {MongoClient} = require("mongodb")
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var}
process.env.CONN;
process.env.NAMEDB;
process.env.COLLECTIONDB;

const get_client = async ()=>{

    const url = process.env.CONN
    const client = new MongoClient(url)
    await client.connect()
    .then( 
        (response)=>{
            console.log("Conexion Exitosa")
        }
    )
    .catch(
        (error)=>{
            console.log("Error en la Conexion")
            console.log(error)
        }
    )
    return client
}

const get_collection = async (clientdb)=>{
    const db = await clientdb.db(process.env.NAMEDB)
    const collection = await db.collection(process.env.COLLECTIONUSER)

    return collection
}

module.exports.get_collection = get_collection;
module.exports.get_client = get_client;