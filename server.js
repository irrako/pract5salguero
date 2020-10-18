const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);

app.get('/', (req, res) => {
res.send('Chat Server is running on port 8000')
});

io.on('connection', (socket) => {
 console.log('user connected')

 socket.on('join', function(userNickname) {

       console.log(userNickname +" : has joined the chat "  );

       socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ");
    });

 socket.on('messagedetection', (senderNickname,messageContent) => {
       
       //Registrar el mensaje en la consola 
       console.log(senderNickname+" :" +messageContent)

       //Crear un objeto de mensaje
       let  message = {"message":messageContent, "senderNickname":senderNickname}

       //Enviar el mensaje al lado del cliente
       io.emit('message', message );
     
    });
      
  
 socket.on('disconnect', function() {
       console.log( ' user has left ')
       socket.broadcast.emit("userdisconnect"," user has left ") 

   });

});

server.listen(8000,()=>{

console.log('Node app is running on port 8000');

});
