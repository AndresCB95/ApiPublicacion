const publicacion_repository = require("../../repository/publicacion/PublicacionRepository")
const jwt_service = require("../security/JwtService")

async function created_publish(username, publicacion){
    publicacion.id_publicacion = jwt_service.encriptar(publicacion.title, username+publicacion.body)
    publicacion.last_update = new Date()
    publicacion.username=username
    publicacion = await publicacion_repository.registre_publicacion(username, publicacion)
    return publicacion
}

async function edit_publish(username, publicacion, id_publicacion){
    publicacion.id_publicacion = jwt_service.encriptar(publicacion.title, username)
    publicacion = await publicacion_repository.actualizar_publicacion(username, publicacion, id_publicacion)
    return publicacion
}

async function get_publishes(username){
    console.log(username)
    publicaciones = await publicacion_repository.get_publicacion(username)
    console.log(publicaciones)
    return publicaciones
}

async function delete_publish(username, id_publicacion){
    publicacion = await publicacion_repository.delete_publicacion(username, id_publicacion)
    return !publicacion
}



module.exports.created_publish = created_publish;
module.exports.delete_publish = delete_publish;
module.exports.get_publishes = get_publishes;
module.exports.edit_publish = edit_publish;