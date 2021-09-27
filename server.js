
const path= require('path');
const http= require('http');
const express= require('express');
const socketio= require('socket.io');
const formatMessage= require('./utils/messages')
const {userJoin, getCurrentUser, userLeave, getRoomUsers}= require('./utils/users')


const app = express();
const server= http.createServer(app);
const io=socketio(server);

//colocando as pastas estaticas (public)
app.use(express.static(path.join(__dirname, 'public')));


const botName = 'UFRB Bot ';

// roda quando o cliente conecta 
io.on('connection', socket=>{  

    socket.on('joinRoom', ({username,room})=>{

      const user= userJoin(socket.id,username, room);

      socket.join(user.room);


      socket.emit('messege',  formatMessage(botName, ' bem vindo ao chat'));

      // Broadcast quando os usuarios se conectam
      socket.broadcast.to(user.room).emit('message',formatMessage(botName, 
        `${user.username} entrou na sala`));
             
        // mandando informações do usuario e sala 

      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room) // todos os usuarios da sala 
      });

    });

      
    
   
    socket.on('chatMessage', msg=>{

      const user = getCurrentUser(socket.id);

      io.to(user.room).emit('messege', formatMessage(user.username, msg));
      
    });

     // roda quando o dev se desconecta 
     socket.on('disconnect', ()=>{

      const user = userLeave(socket.id);

      if(user){
        io.to(user.room).emit('messege',  formatMessage(botName, `${user.username} deixou a sala`));
        
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room) // todos os usuarios da sala 
    });

      }});

});


//process.env.PORT || 3000 significa: o que quer que esteja na variável de ambiente PORT ou 3000
const PORT=3000|| process.env.PORT;

server.listen(PORT, ()=>console.log(`Server rodando na porta ${PORT}`));
