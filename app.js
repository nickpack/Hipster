var app = require('express').createServer()
  , io = require('socket.io').listen(app);

app.listen(3000);

// Apparently the number of open sockets count from socket.io includes disconnected users which are nulled
// therefore the count will be wrong if this is used.

var connectedUsers = 0;

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	connectedUsers++;
	console.log('User connected');
	io.sockets.emit('onlineusers', { users: connectedUsers });
});

io.sockets.on('disconnect', function (socket) {
	connectedUsers--;
	console.log('User disconnected');
	io.sockets.emit('onlineusers', { users: connectedUsers });
});