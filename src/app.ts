import express from "express";
import cors from "cors";
import { Socket } from "socket.io";
import { Player } from "./player";
import { PlayerList } from "./playerList";
import { MapTile } from "./mapTile";

const app: express.Application = express();

const players: PlayerList = {};

app.use(cors());

const map: MapTile[] = [
  {
    color: 1,
    x: 811,
    y: 1772,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 619,
    y: 1687,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 815,
    y: 1534,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 486,
    y: 1349,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 830,
    y: 1184,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 535,
    y: 968,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 125,
    y: 846,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 466,
    y: 724,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 659,
    y: 561,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 334,
    y: 405,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 116,
    y: 199,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 682,
    y: 172,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 114,
    y: 574,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 89,
    y: 1440,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 292,
    y: 1811,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 461,
    y: 1703,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 982,
    y: 1638,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 568,
    y: 1462,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 339,
    y: 1128,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 822,
    y: 851,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 366,
    y: 583,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 862,
    y: 425,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 406,
    y: 201,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 946,
    y: 1382,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 39,
    y: 980,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 419,
    y: 336,
    w: 130,
    h: 30,
  },
];
// [
// { x: 85, y: 1751, w: 130, h: 30, color: 0 },
// { x: 480, y: 1669, w: 130, h: 30, color: 0 },
// { x: 543, y: 1536, w: 130, h: 30, color: 0 },
// { x: 238, y: 1357, w: 130, h: 30, color: 0 },
// { x: 573, y: 1209, w: 130, h: 30, color: 0 },
// { x: 887, y: 1130, w: 130, h: 30, color: 0 },
// { x: 569, y: 1034, w: 130, h: 30, color: 0 },
// { x: 302, y: 917, w: 130, h: 30, color: 0 },
// { x: 95, y: 1109, w: 130, h: 30, color: 0 },
// { x: 812, y: 1762, w: 130, h: 30, color: 1 },
// { x: 290, y: 1717, w: 130, h: 30, color: 1 },
// { x: 327, y: 1551, w: 130, h: 30, color: 1 },
// { x: 630, y: 1436, w: 130, h: 30, color: 1 },
// { x: 861, y: 1237, w: 130, h: 30, color: 1 },
// { x: 289, y: 1156, w: 130, h: 30, color: 1 },
// { x: 535, y: 1069, w: 130, h: 30, color: 1 },
// { x: 261, y: 994, w: 130, h: 30, color: 1 },
// { x: 634, y: 917, w: 130, h: 30, color: 1 },
// ];

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket: Socket) => {
  //   console.log("connect", socket.id);
  io.emit("msg", { some: "data" });
  players[socket.id] = new Player(socket.id);
  socket.emit("takeYourIdAndLeaveMeAlone", socket.id);
  socket.emit("connectedPlayers", players);
  socket.emit("takeTheMapAndBeQuiet", map);
  socket.broadcast.emit("newPlayer", players[socket.id]);

  socket.on("disconnect", () => {
    // console.log("disconnect", socket.id);
    io.emit("playerDisconnected", socket.id);
    delete players[socket.id];
  });

  socket.on("updatedPosition", (position) => {
    // console.log("updatePosition", socket.id, position);
    players[socket.id].setPosition(position.x, position.y);
    socket.broadcast.emit("updatedPlayerPositions", { [socket.id]: position });
  });

  socket.on("updatedColor", (color) => {
    // console.log("updatedColor", socket.id, color);
    players[socket.id].setColor(color);
    socket.broadcast.emit("updatedPlayerColor", { [socket.id]: color });
  });

  socket.on("setMyUsername", (username: string) => {
    players[socket.id].setName(username);
    socket.broadcast.emit("nameChanged", { [socket.id]: username });
  });

  socket.on("updatedDirection", (direction) => {
    // console.log("updatedDirection", socket.id, direction);
    players[socket.id].setDirection(direction);
    socket.broadcast.emit("updatedPlayerDirection", { [socket.id]: direction });
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
  console.log("listening on *:3000");
});
