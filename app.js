"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var sio = require("socket.io");
var ball = require("./ball");
var app = express();
app.use(express.json());
app.use(express.static('./'));
var server = http.createServer(app);
var players = [];
var gameRounds;
var port = process.env.PORT || 3000;
server.listen(port, function () { return console.log("Server is listening on port " + port + "..."); });
var socket = sio(server);
function sendLeftPoints(num) {
    players[0].score = num;
    if (num >= gameRounds) {
        socket.emit('gameover', players);
        socket.emit('leftPoint', 0);
        return false;
    }
    socket.emit('leftPoint', num);
    return true;
}
exports.sendLeftPoints = sendLeftPoints;
function sendRightPoints(num) {
    players[1].score = num;
    if (num >= gameRounds) {
        socket.emit('gameover', players);
        socket.emit('rightPoint', 0);
        socket.emit('leftPoint', 0);
        return false;
    }
    socket.emit('rightPoint', num);
    return true;
}
exports.sendRightPoints = sendRightPoints;
function sendBallPosition(x, y) {
    socket.emit('ball', x, y);
}
exports.sendBallPosition = sendBallPosition;
// Handle the connection of new websocket clients
socket.on('connection', function (socket) {
    socket.on('login', function (newUserName) {
        var player = newUserName;
        if (players.length < 2) {
            players.push(player);
            socket.emit('login success', players.length);
        }
        socket.on('disconnect', function () {
            console.log('Got disconnect!');
            players.pop();
        });
    });
    socket.on('start game', function (clientHeight, clientWidth, ballHeight, ballWidth, paddleWidth, paddleHeight, paddleLeft, rounds) {
        if (players.length === 2) {
            gameRounds = rounds;
            socket.emit('game started');
            socket.broadcast.emit('game started');
            ball.ballFunction(clientHeight, clientWidth, ballHeight, ballWidth, paddleWidth, paddleHeight, paddleLeft);
        }
    });
    // Handle an ArrowKey event
    socket.on('ArrowKey', function (code, name) {
        if (players[0].name == name) {
            ball.setLeftPaddle(code);
        }
        else {
            ball.setRightPaddle(code);
        }
        ;
        // Broadcast the event to all connected clients except the sender
        socket.broadcast.emit('ArrowKey', code);
    });
});
