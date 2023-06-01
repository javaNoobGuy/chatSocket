var socket = io();
if (localStorage.getItem('nomeUser') == undefined) {

  localStorage.setItem('nomeUser', '');

}

messages = [];

function login() {

  let nome = document.getElementById('nome').value;
  socket.emit('loginMade', { nome });

};

socket.on('isNameValid', (res) => {
  let nome = document.getElementById('nome').value;
  if (!res) {
    alert('nome já usado amigo ;)');
  } else {
    localStorage.setItem('nomeUser', nome);
    socket.emit('addUser', { nome });
    location.href = "talk.html";
  }
});

console.log('fdsf' + location.href);

if (location.href == "http://localhost:3000/talk.html" || location.href == "https://chatsocket.javanoobguy.repl.co/talk.html" ) {
  //socket.emit('getMessages');
  socket.emit('getMessages');
  console.log('requsisção de mensagens');
}



socket.on('update', (data) => {
  console.log(data);
  messages = data;
  console.log(messages);
  renderM();
  
});


socket.on('userJoin',() =>{

});

function renderM() {
  let mensagens = document.getElementById('campoMensagem');
  mensagens.innerHTML = "";
  for (let i = 0; i < messages.length; i++) {
    console.log('desenhando a ');
    console.log(messages[i]);

    let mensagemAtual = document.createElement('div');
    let span = document.createElement('span');
    let bold = document.createElement('b');
    span.innerText =  messages[i].content; 
    //span.append(bold);
    mensagemAtual.append(span);
    if (messages[i].owner.nome == localStorage.getItem('nomeUser')) {
      mensagemAtual.className = 'userText';
    } else {
      mensagemAtual.className = 'othersText';
    }
    mensagens.append(mensagemAtual);
  }
}

function send() {
  let content = document.getElementById('mensagem').value;
  let nome = localStorage.getItem('nomeUser');
  console.log('enviando mensagens ao servidor');
  socket.emit('sendMessage', { content, nome });

}




