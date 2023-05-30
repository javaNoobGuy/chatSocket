var socket = io();
if(sessionStorage.getItem('nomeUser') == undefined){

    sessionStorage.setItem('nomeUser','');

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
            sessionStorage.setItem('nomeUser',nome);
            socket.emit('addUser',{nome});
            location.href = "talk.html";
        }});

if(location.href = "http://localhost:3000/talk.html"){
    renderM();
}

socket.on('update', (data) =>{
    messages = data;
    renderM();
});

function renderM(){
    for(let i = 0; i < messages.lenght;i++){
        let mensagens = document.getElementById('mensagens');
        mensagens.innerHTML = "";
        let mensagemAtual = document.createElement('div');
        mensagemAtual.innerText = messages[i].content;
        if(mensages[i].owner.nome = sessionStorage.getItem('nomeUser')){
            mensagemAtual.className = 'userText';
        }else{
            mensagemAtual.className = 'othersText';
        }
        mensagens.append()
    }
}




