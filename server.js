
const path= require('path');
const http= require('http');
const express= require('express');
const socketio= require('socket.io');


const app = express();
const server= http.createServer(app);
const io=socketio(server);

//colocando as pastas estaticas (public)
app.use(express.static(path.join(__dirname, 'public')));


// roda quando o cliente conecta 
io.on('connection', socket=>{  
    
    socket.emit('messege','Bem vindo ao chat dev UFRB');

    // Broadcast quando os usuarios se conectam
    socket.broadcast.emit('message', ' O usuario se juntou ao site');

    // roda quando o dev se desconecta conecta
    socket.on('disconnect', ()=>{
       io.emit('messege', 'O desenvolvedor deixou a sala')
    });

    // Listen for chatMessage event

    socket.on('chatMessage', msg=>{
      io.emit('messege',msg );
      
    });

    
});




//process.env.PORT || 3000 significa: o que quer que esteja na variável de ambiente PORT ou 3000
const PORT=3000|| process.env.PORT;

server.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
