/*
 * This is a stub for a socket.io server that responds to CRUD operations
 */

var app = require('express').createServer()
  , io = require('socket.io').listen(app);

var create = function (socket, signature) {
    var e = event('create', signature), data = [];
    socket.emit(e, {id : 1});            
};

var read = function (socket, signature) {
    var e = event('read', signature), data;
    data.push({})
    socket.emit(e, data);            
};

var update = function (socket, signature) {
    var e = event('update', signature), data = [];
    socket.emit(e, {success : true});            
};

var destroy = function (socket, signature) {
    var e = event('delete', signature), data = [];
    socket.emit(e, {success : true});            
};

// creates the event to push to listening clients
var event = function (operation, sig) {
    var e = operation + ':'; 
    e += sig.endPoint;
    if (sig.ctx) e += (':' + sig.ctx);

    return e;
};

//js+css files
app.get('/*.(js|css)', function(req, res){
  res.sendfile("./"+req.url);
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('create', function (data) {
        create(socket, data.signature);       
    });      
    socket.on('read', function (data) {
        read(socket, data.signature);
    });  
    socket.on('update', function (data) {
        update(socket, data.signature);       
    }); 
    socket.on('delete', function (data) {
        destroy(socket, data.signature);       
    });    
});

// Listen on port 3000, connect via eg local:3000
app.listen(3000);
