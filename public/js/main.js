var socket = io();
if(sessionStorage.getItem('nomeUser') == undefined){

    sessionStorage.setItem('nomeUser','');

}

function login(){

    let nome = document.getElementById('nome').value;
    socket.emit('loginMade',{nome});
    io.on('isNameValid', (res) =>{

        if(!res){
            alert('nome já usado amigo ;)');
        }else{
            sessionStorage.setItem('nomeUser',nome);
            socket.emit('addUser',{nome});
            location.href = "talk.html";
        }


    });




}




