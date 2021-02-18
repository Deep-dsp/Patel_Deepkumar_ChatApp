const express = require('express');
const path = require('path');

const messenger = require('socket.io')();

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5050;

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html")); //localhost:3000/index.html
});

app.get("/chat", (req, res) => {
	res.sendFile(path.join(__dirname, "chat.html")); //localhost:3000/chat.html
});

const server = app.listen(port, ()=>{
	console.log(`app is running on ${port}`);
});

//messenger is a connection manager -> like switchboard operator
messenger.attach(server);

// Socket is an induvidual connection - the caller
messenger.on('connection', (socket)=>{
	console.log(`a user connected: ${socket.id}`);

	//send the connected user to their assigner ID
	socket.emit('connected', {sID: `${socket.id}`, message:'new connection'});

	socket.on('chatmessage', function(msg){
		console.log(msg);
		messenger.emit('message', {id:socket.id, message:msg});
	});

	socket.on('disconnect', ()=>{
		console.log("user disconnected");
	});
});
