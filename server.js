
const path= require('path');
const http= require('http');
const express= require('express');
const socketio= require('socket.io');
const formatMessage= require('./utils/messages')


const app = express();
const server= http.createServer(app);
const io=socketio(server);

//colocando as pastas estaticas (public)
app.use(express.static(path.join(__dirname, 'public')));


const botName = 'ChatCord Bot';

// roda quando o cliente conecta 
io.on('connection', socket=>{  
    
    socket.emit('messege',  formatMessage(botName, 'bem vindo ao chat'));

    // Broadcast quando os usuarios se conectam
    socket.broadcast.emit('message',  formatMessage(botName, 'Se juntou ao site'));

    // roda quando o dev se desconecta conecta
    socket.on('disconnect', ()=>{
       io.emit('messege',  formatMessage(botName, 'deixou a sala'))
    });



    socket.on('chatMessage', msg=>{
      io.emit('messege', formatMessage('USER', msg));
      
    });

    
});


//process.env.PORT || 3000 significa: o que quer que esteja na variável de ambiente PORT ou 3000
const PORT=3000|| process.env.PORT;

server.listen(PORT, ()=>console.log(`Server rodando na porta ${PORT}`));
