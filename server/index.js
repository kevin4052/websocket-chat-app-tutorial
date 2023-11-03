import express from "express"
import { Server } from 'socket.io'
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname =  path.dirname(__filename)
const PORT = process.env.PORT || 3500

const app = express()

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")))

// START SERVER
const expressServer = app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})

// INITIALIZE SOCKET WITH CORS
const socketServer = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5501", "http://127.0.0.1:5501"]
    }
})

// TURNING ON SOCKET AND LISTEN FOR MESSAGE
socketServer.on('connection', socket => {
    console.log(`User ${socket.id} connected`)
    
    socket.on('message', data => {
        console.log(data)
        socketServer.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })
})
