const socket= io();
const chatForm= document.getElementById('chat-form');
const chatMessages= document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// pegando o nome e a sala através da url

const{username, room}=Qs.parse(location.search,{

ignoreQueryPrefix:true

});


socket.emit('joinRoom', {username, room})


// pegando os usuarios e salas 

socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
  });


// mensagem do servidor 
socket.on('messege', message =>{
console.log(message);
outputMessage(message);


// Scroll down 
chatMessages.scrollTop=chatMessages.scrollHeight;




});

chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    // pegando a mesagem 
    const msg=e.target.elements.msg.value;

    // enviar a mensagem para o server 
    socket.emit('chatMessage', msg);

    // limpando a barra de mensagens
     e.target.elements.msg.value='';
     e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username } <span> ${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}

// colocando o nome da sala 
function outputRoomName(room) {
    roomName.innerText = room;
  }


  // colocando os usuarios
function outputUsers(users) {

    userList.innerHTML = `${users.map(user=> `<li> ${user.username} </li>`).join('')}`
    
  }


 

