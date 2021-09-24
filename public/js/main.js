const socket= io();
const chatForm= document.getElementById('chat-form');
const chatMessages= document.querySelector('.chat-messages');


// mensagem do servidor 
socket.on('messege', message =>{
console.log(message);
outputMessage(message);


// Scroll down 
chatMessages.scrollTop=chatMessages.scrollHeigh;




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
    div.innerHTML=`<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);
}