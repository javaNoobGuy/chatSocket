const express = require('express');
const { truncate } = require('fs');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.static(__dirname + "/public"));

var usuarios = [];
var messages = [];

app.get('/', (req, res) => res.sendFile(__dirname + 'public/login.html'));

function User(id, nome){
    this.talks = [];
    this.id = id;
    this.nome = nome;
    this.addTalk = function(anotherUser){
        let talkUsers = [this, anotherUser ];

        this.talks.push(new Talk(talkUsers));
    }
}

function Message(owner, content){

    this.owner = owner;
    this.content = content;

}

function Talk(users){

    this.users = users;
    this.talkId = users[0].id +'-'+ users[1].id;
    if(users.lenght > 2){

    }
    this.messages = [];
    this.addMessage = function(message){
        this.messages.push(message); 
    }


}

io.on('connection', (socket) => {console.log('usuário conectado id da conexão ',socket.id )

    socket.on('disconnect', (socket) => console.log('you was diconnected',socket))

    socket.on('sendItToServer', (msg) =>{

        console.log(msg);
        socket.broadcast.emit('sendItToServer', msg);

    });

    socket.on('getMessages',() =>{

        socket.emit('update', messages);

    });

    socket.on('sendMessage',(data) =>{

        for(let i = 0; i < usuarios.length;i++){

            if(usuarios[i].nome == data.nome){
                usuarios[i].id = socket.id;
                messages.push(new Message(usuarios[i],data.content));
                console.log(messages);
                socket.emit('update', messages);
            }


        }

    });

    
socket.on('loginMade',(data) =>{

    let res = true;
    
    for(let i = 0 ; i < usuarios.length; i++){

        if(usuarios[i].nome == data.nome){
            res = false;
        }else{
            res = true;
        }

    }

    console.log(res);

    socket.emit('isNameValid', res);

});

socket.on('addUser', (data) =>{
    console.log(data);
    usuarios.push(new User(socket.id, data.nome));
    console.log(usuarios);

});

});

http.listen(3000, () =>{
    console.log("fdsfsdf");
})


