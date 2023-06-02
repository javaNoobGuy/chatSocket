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

console.log(location.href);

if (location.href == "http://localhost:3000/talk.html" || location.href == "https://chatsocket.javanoobguy.repl.co/talk.html" || location.href == 'https://chatsocket--javanoobguy.repl.co/talk.html' || 'https://chatonline-juanarmazenamento79.b4a.run/talk.html'){
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

function renderU() {
    let usersList = document.getElementById('usersList');
    usersList.innerHTML = "";
    for (let i = 0; i < usuarios.length; i++) {

        let currentUserDiv = document.createElement('div');
        currentUserDiv.className = 'userGeneral';
        let userImg = document.createElement('img');
        let title = document.createElement('div');
        title.className = 'title';
        let userName = document.createElement('div');
        userName.className = 'userName';
        userName.innerText = usuarios[i].nome;
        let lastMessage = document.createElement('div');
        lastMessage.className = "lastMessage";
        lastMessage.innerText = usuarios[i].lastM;

        currentUserDiv.append(userImg);
        title.append(userName);
        title.append(lastMessage);
        currentUserDiv.append(title);
        usersList.append(currentUserDiv);

    }

}

function send() {
  let content = document.getElementById('mensagem').value;
  let nome = localStorage.getItem('nomeUser');
  console.log('enviando mensagens ao servidor');
  socket.emit('sendMessage', { content, nome });

}




