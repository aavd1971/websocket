var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname,'public')));

io.sockets.on('connection',function(socket){
    socket.on('draw',function (data){
          socket.broadcast.emit('draw',{x: data.x,y: data.y,type: data.type});
    }
    );
});

http.listen(3000,function (){
    console.log('server run on port: 3000');
}
);