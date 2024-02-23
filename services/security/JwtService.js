const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const crypto = require('crypto')

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

async function validation_request(req){
  const authHeader = req.headers['authorization']
  const username = req.headers['username']
  const token = authHeader && authHeader.split(' ')[1]
  resp = await authenticateToken(token, username)
  return token != null && resp
}

function authenticateToken(token, username) {
    return jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      return !err && username == user.username
    })
}

function encriptar(titulo, username) {
    // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
    var hmac = crypto.createHmac('sha1', username).update(titulo).digest('hex')
    return hmac
 }


module.exports.validation_request = validation_request;
module.exports.encriptar = encriptar;
