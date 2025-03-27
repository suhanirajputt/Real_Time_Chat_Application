const express = require('express')    //Import express
const app = express()
const http = require('http').createServer(app)
 
const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))  //express middleware : static

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 

//send msg
const io = require('socket.io')(http)   //import socket server and set with // http server

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)   //socket.broadcast.emit will send the message to all the other clients except the newly created connection
    })

})


// npm run dev  :  To run the Project