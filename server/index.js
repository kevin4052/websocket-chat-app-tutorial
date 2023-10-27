const ws = require("ws")
const server = new ws.Server({ port: 5500 })

server.on('connection', socket => {
    socket.on('message', message => {
        const buffer = Buffer.from(message)
        console.log(buffer.toString())
        socket.send(`${message}`)
    })
})


