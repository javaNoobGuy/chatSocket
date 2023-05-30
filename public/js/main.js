var socket = io();
if(localStorage.getItem('nomeUser') == undefined){

    localStorage.setItem('nomeUser','');

}

messages = [];

function login(){

    let nome = document.getElementById('nome').value;
    socket.emit('loginMade',{nome});

};

    socket.on('isNameValid', (res) =>{
        let nome = document.getElementById('nome').value;
        if(!res){
            alert('nome já usado amigo ;)');
        }else{
            localStorage.setItem('nomeUser',nome);
            socket.emit('addUser',{nome});
            location.href = "talk.html";
        }});

if(location.href == "http://localhost:3000/talk.html"){
    socket.emit('getMessages');
    console.log('requsisção de mensagens');
}

socket.on('update', (data) =>{
    messages = data;
    console.log(messages);
    renderM();
});

function renderM(){
    let mensagens = document.getElementById('campoMensagem');
    mensagens.innerHTML = "";
    for(let i = 0; i < messages.length;i++){
        console.log('desenhando a ');
        console.log(messages[i]);
        
        let mensagemAtual = document.createElement('div');
        let span = document.createElement('span');
        span.innerText = messages[i].content;
        mensagemAtual.append(span);
        if(messages[i].owner.nome = localStorage.getItem('nomeUser')){
            mensagemAtual.className = 'userText';
        }else{
            mensagemAtual.className = 'othersText';
        }
        mensagens.append(mensagemAtual);
    }
}

function send(){
    let content = document.getElementById('mensagem').value;
    let nome = localStorage.getItem('nomeUser');
    console.log('enviando mensagens ao servidor');
    socket.emit('sendMessage', {content, nome});

}




