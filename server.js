const express = require('express');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.static(__dirname + "/public"));

var usuarios = [];
var messages = [];

app.get('/', (req, res) => res.sendFile(__dirname + 'public/index.html'));

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

    })

})


io.on('loginMade',(data) =>{

    let res = null;
    
    for(let i = 0 ; i < usuarios.length; i++){

        if(usuarios[i].nome == data.nome){
            res = false;
            break;
        }else{
            res = true;
        }

    }

    io.emit('isNameValid', res);

});

io.on('addUser', (data) =>{

    usuarios.push(new User(io.id, data.nome));

})

http.listen(3000, () =>{
    console.log("fdsfsdf");
})


