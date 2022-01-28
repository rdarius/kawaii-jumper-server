import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import { Socket } from "socket.io";
import { Player } from "./player";
import { PlayerList } from "./playerList";

const app: express.Application = express();

const players: PlayerList = {};

app.use(cors());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
});

io.on('connect', (socket: Socket) => {
	io.emit('msg', {some: 'data'});
	players[socket.id] = new Player(socket.id);
	socket.emit('takeYourIdAndLeaveMeAlone', socket.id);
	socket.emit('connectedPlayers', players);
	socket.broadcast.emit('newPlayer', players[socket.id]);

	socket.on('disconnect', () => {
		delete players[socket.id];
		io.emit('playerDisconnected', socket.id);
	});

	socket.on('updatedPosition', (position) => {
		players[socket.id].setPosition(position.x ,position.y);
		socket.broadcast.emit('updatedPlayerPositions', {[socket.id]: position});
	});

});

// app.listen(config.port, async () => {
// 	await mongoose.connect(config.mongodb || 'mongodb://localhost/typescript-express-api-template', {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true,
// 	}, (err) => {
// 		if (err) {
// 			console.log(err.message);
// 			console.log(err);
// 		}
// 	});
// });

server.listen(3000, () => {
	console.log('listening on *:3000');
});
