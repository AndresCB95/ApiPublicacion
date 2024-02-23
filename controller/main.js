const express = require("express")
const cors = require("cors")
const body_parser = require("body-parser")
const jwtService = require('../services/security/JwtService')
const publicacion_service = require('../services/publicacion/PublicacionServices')
const app = express()
const port = 3001

app.use(cors())
app.use(body_parser.json())

app.get('/api/publicaciones', async (req, res) => {
  resp = await jwtService.validation_request(req)
  if(resp) {
    const username = req.headers['username']
    return res.json(await publicacion_service.get_publishes(username))
  }
  else return res.sendStatus(403)
})

app.post('/api/createPublish', async (req, res) => {
  resp = await jwtService.validation_request(req)
  if(resp) {
    const publicacion = req.body
    const username = req.headers['username']
    const publicacion_resp = await publicacion_service.created_publish(username, publicacion)
    if(publicacion_resp) return res.json(await publicacion_service.get_publishes(username))
    else return res.sendStatus(500) 
  }else return res.sendStatus(403)

});

app.put('/api/update', async (req, res) => {
  resp = await jwtService.validation_request(req)
  if(resp) {
    const publicacion = req.body
    const username = req.headers['username']
    const publicacion_resp = await publicacion_service.edit_publish(username, publicacion, publicacion.id_publicacion)
    console.log(publicacion_resp)
    if(publicacion_resp) return res.json(await publicacion_service.get_publishes(username))
    else return res.sendStatus(500)
  }else return res.sendStatus(403)
});

app.delete('/api/delete', async (req, res) => {
  resp = await jwtService.validation_request(req)
  if(resp) {
    const publicacion = req.body
    const username = req.headers['username']
    const publicacion_resp = await publicacion_service.delete_publish(username, publicacion.id_publicacion)
    if(publicacion_resp) return res.json(await publicacion_service.get_publishes(username))
    else return res.sendStatus(500)
  }else return res.sendStatus(403)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})