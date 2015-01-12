onload = init;
var canvas,ctx,socket;
var clicked = 0;

function init(){
    canvasInit();

    socket = io.connect('http://localhost:3000');


    $('#canvas').on('mousemove mouseup mousedown',function (e){
        var x = e.offsetX;
        var y = e.offsetY;
        var type = e.type;
        draw(x,y,type);
        socket.emit('draw',{x:x,y:y,type:type});
    });

    socket.on('draw',function (data){
        draw(data.x,data.y,data.type);
    }
    );
}
function canvasInit(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'gray';
    ctx.strokeRect(0,0,canvas.width,canvas.height);
}

function draw(x,y,type){

    switch (type){
        case 'mousedown':
            clicked = 1;
            ctx.beginPath();
            ctx.moveTo(x,y);
            break;
        case 'mousemove':
            if(clicked){
            ctx.lineTo(x,y);
            ctx.stroke();
            }
            break;
        case 'mouseup':
            clicked = 0;
            ctx.closePath();
            break;
    }
}


