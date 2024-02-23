const conn = require("./Conexion")
const dotenv = require('dotenv');
const mongoService = require("./mongoDbService")

// get config vars
dotenv.config();


async function get_publicacion(username){
    var publicaciones = [{}]
    const {client, collection} = await get_conexion()
        await mongoService.find_all(collection, {"username": username}).then(
            (respuesta) =>{
                publicaciones = respuesta
            }
        )
        await mongoService.close_client(client)
    return publicaciones
}


async function registre_publicacion(username, publicacion){
    var publish = {}
    var resp = ""
    const {client, collection} = await get_conexion()
    const save_objetc = [publicacion]
    await mongoService.insert(collection, save_objetc).then(
        (respuesta) =>{
            resp = respuesta
        }
    )
    const filtro = {"username":username,"title":publicacion.title}
    publish = await mongoService.find_one(collection,filtro)
    await mongoService.close_client(client)
    return publish
}

async function actualizar_publicacion(username, publicacion, id_publicacion){
    var publish = {}
    var resp = ""
    const {client, collection} = await get_conexion()
    var filtro = {"username":username, "id_publicacion":id_publicacion}
    let update = {"$set":{"title":publicacion.title, "body":publicacion.body, "last_update":new Date(), "id_publicacion":publicacion.id_publicacion}}
    await mongoService.update(collection, filtro, update).then(
        (respuesta) =>{
            resp = respuesta
        }
    )
    var filtro = {"username":username, "id_publicacion":publicacion.id_publicacion}
    publish = await mongoService.find_one(collection,filtro)
    await mongoService.close_client(client)
    return publish
}

async function delete_publicacion(username, id_publicacion){
    var publicacion = {}
    var resp = ""
    const {client, collection} = await get_conexion()
    const filtro = {"username": username, "id_publicacion":id_publicacion}
        await mongoService.delete_(collection, filtro).then(
            (respuesta) =>{
                resp = respuesta
            }
        )
        publicacion = await mongoService.find_one(collection,filtro)
        await mongoService.close_client(client)
    return publicacion
}

async function get_conexion(){
    const client = await conn.get_client()
    const collection = await conn.get_collection(client)
    return {client, collection}
}


module.exports.get_publicacion = get_publicacion;
module.exports.registre_publicacion = registre_publicacion;
module.exports.actualizar_publicacion = actualizar_publicacion;
module.exports.delete_publicacion = delete_publicacion;