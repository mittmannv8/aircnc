const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const socketio = require('socket.io')
const http = require('http')

const config = require('./config')
const routes = require('./routes')

const connectedUsers = {}

// declara acesso ao mongodb
mongoose.connect(
    config.mongodb_uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

// declara app
const app = express()
const server = http.Server(app)
// declara websocket
const io = socketio(server)
io.on('connection', socket => {
    const { user_id, connectionType } = socket.handshake.query
    connectedUsers[user_id] = socket.id
    socket.join(connectionType)
})

// middleware para adicionar o socket e os usuários conectados nele
app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

// req.query -> query params
// req.params -> params da url /users/:id
// req.body -> body da request

// define que será usado json
app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes)

// Inicia o server
server.listen(config.api_port)


