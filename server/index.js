import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer();

const socketServer = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5501", "http://127.0.0.1:5501"]
    }
})

socketServer.on('connection', socket => {
    console.log(`User ${socket.id} connected`)
    
    socket.on('message', data => {
        console.log(data)
        socketServer.emit('message', `${socket.id.substring(0, 5)}: ${data}`)
    })
})

httpServer.listen(3500, () => console.log('listening on port 3500'))
