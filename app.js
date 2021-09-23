var app = require('./config/server');

var server = app.listen(80, function(){
    console.log("*Servidor ON*");
});

var io = require('socket.io').listen(server);

var Usuarios = new app.app.models.Usuarios;

app.set('io', io);
app.set('usuarios', Usuarios);

io.on('connection', function(socket){
    socket.on('msg4Servidor', function(data){
        socket.emit('msg4Cliente', {apelido:data.apelido, complemento: data.complemento});
        socket.broadcast.emit('msg4Cliente', {apelido:data.apelido, complemento: data.complemento});
    });
    socket.on('updParticipante', function(users){
        socket.emit('participante4Cliente', {users:users});
        socket.broadcast.emit('participante4Cliente', {users:users});
    });
    socket.on('delParticipante', function(data){
        app.get('usuarios').removeUser(data.apelido);
        socket.broadcast.emit('participante4Cliente', {users:{users: Usuarios.getUsers().toString()}});
    });
});