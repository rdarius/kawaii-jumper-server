import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import { Socket } from "socket.io";
import { Player } from "./player";
import { PlayerList } from "./playerList";
import { MapTile } from "./mapTile";
import { Position } from "./position";

const app: express.Application = express();

const players: PlayerList = {};

app.use(cors());

const map: MapTile[] = [
  {
    color: 1,
    x: 811.9583727530747,
    y: 1772.8666035950805,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 619.4134342478714,
    y: 1687.4929044465468,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 815.5912961210975,
    y: 1534.9101229895932,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 486.8117313150426,
    y: 1349.6310312204353,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 830.1229895931883,
    y: 1184.333017975402,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 535.8561967833491,
    y: 968.1740775780512,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 125.33585619678335,
    y: 846.4711447492905,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 466.8306527909177,
    y: 724.7682119205299,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 659.3755912961211,
    y: 561.2866603595081,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 334.2289498580889,
    y: 405.0709555345317,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 116.25354777672659,
    y: 199.81078524124882,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 682.9895931882687,
    y: 172.56385998107854,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 114.43708609271523,
    y: 574.0018921475876,
    w: 130,
    h: 30,
  },
  {
    color: 1,
    x: 89.00662251655629,
    y: 1440.4541154210028,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 292.45033112582786,
    y: 1811.012298959319,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 461.38126773888365,
    y: 1703.841059602649,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 982.705771050142,
    y: 1638.4484389782403,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 568.5525070955534,
    y: 1462.2516556291391,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 339.678334910123,
    y: 1128.0227057710501,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 822.8571428571429,
    y: 851.9205298013245,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 366.9252601702933,
    y: 583.0842005676443,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 862.8192999053927,
    y: 425.0520340586566,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 406.8874172185431,
    y: 201.62724692526018,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 946.3765373699149,
    y: 1382.3273415326396,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 39.962157048249765,
    y: 980.8893093661306,
    w: 130,
    h: 30,
  },
  {
    color: 0,
    x: 419.6026490066225,
    y: 336.0454115421003,
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
  console.log("connect", socket.id);
  io.emit("msg", { some: "data" });
  players[socket.id] = new Player(socket.id);
  socket.emit("takeYourIdAndLeaveMeAlone", socket.id);
  socket.emit("connectedPlayers", players);
  socket.emit("takeTheMapAndBeQuiet", map);
  socket.broadcast.emit("newPlayer", players[socket.id]);

  socket.on("disconnect", () => {
    console.log("disconnect", socket.id);
    io.emit("playerDisconnected", socket.id);
    delete players[socket.id];
  });

  socket.on("updatedPosition", (position) => {
    console.log("updatePosition", socket.id, position);
    players[socket.id].setPosition(position.x, position.y);
    socket.broadcast.emit("updatedPlayerPositions", { [socket.id]: position });
  });

  socket.on("updatedColor", (color) => {
    console.log("updatedColor", socket.id, color);
    players[socket.id].setColor(color);
    socket.broadcast.emit("updatedPlayerColor", { [socket.id]: color });
  });

  socket.on("updatedDirection", (direction) => {
    console.log("updatedDirection", socket.id, direction);
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
