const app = require('express')();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

io.on('connection', (socket) => {console.log('usuário conectado id da conexão ',socket.id )

    socket.on('disconnect', (socket) => console.log('you was diconnected',socket))

    socket.on('chat message', (socket) => {console.log(socket);io.emit('chat message', socket);});

    socket.on('sendItToServer', (msg) =>{

        console.log(msg);
        socket.broadcast.emit('sendItToServer', msg);

    })

})



http.listen(3000, () =>{
    console.log("fdsfsdf");
})


