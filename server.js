const { Socket } = require('dgram');
const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.get('/view', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
})


io.on('connection', socket => {
    console.log('user is connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
      
    socket.on('send-message', data => {
        io.sockets.emit('send-message', data)
        
    });
});


server.listen(5000);
console.log('server started on ');