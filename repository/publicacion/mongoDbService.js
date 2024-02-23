
const insert = async (collection,publicacionlist)=>{
    await collection.insertMany(publicacionlist)
    .then(
        (respuesta)=>{
            console.log("Inserto los documentos")
        }
    )
    .catch(
        (error)=>{
            console.log(error)
            throw error
        }
    )

    return "Documento insertados"
}


async function find_all(collection,filtro){

    const resultado = await collection.find(filtro).sort ( { last_update: -1 } ).toArray()

    return resultado
}

async function find_one(collection,filtro){

    let resultado = {}

    await collection.findOne(filtro)
    .then(
        (respuesta)=>{
            resultado = respuesta
        }
    )
    .catch(
        (error)=>{
            console.log(error)
            throw error
        }
    )

    return resultado
}

const update = async (collection,filtro,update)=>{

    await collection.updateOne(filtro,update)
    .then(
        (response)=>{
            console.log("Actualizo el documento")
        }
    )
    .catch(
        (error)=>{
            console.log("Error Actualizando el documento")
            console.log(error)
        }
    )
}

const delete_= async (collection,filtro)=>{

    collection.deleteMany(filtro)
    .then(
        (respuesta)=>{
            console.log("Documentos eliminados")
        }
    )
    .catch(
        (error)=>{
            console.log(error)
            throw error
        }
    )

    return "Documento eliminados"
}


const close_client = async (client)=>{

    await client.close()

}


module.exports.insert = insert;
module.exports.find_all = find_all;
module.exports.find_one = find_one;
module.exports.update = update;
module.exports.delete_ = delete_;
module.exports.close_client = close_client;
