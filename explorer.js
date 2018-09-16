/*jslint node: true */
"use strict";
require('./relay');
var conf = require('idanode-common/conf.js');
var eventBus = require('idanode-common/event_bus.js');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ws = require('./controllers/ws');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/detail', function(req, res) {
	res.sendFile(__dirname + '/views/detail.html');
});

app.get('/addressMap', function(req, res) {
	res.sendFile(__dirname + '/views/addressMap.html');
});

eventBus.on('new_joint', function() {
	io.sockets.emit('update');
});

io.on('connection', function(socket) {
	socket.on('staticdata', ws.staticdata);
	socket.on('start', ws.start);
	socket.on('next', ws.next);
	socket.on('prev', ws.prev);
	socket.on('new', ws.newUnits);
	socket.on('info', ws.info);
	socket.on('highlightNode', ws.highlightNode);
	socket.on('nextPageTransactions', ws.nextPageTransactions);
});

io.of('addressMap').on('connection', function(socket) {
        socket.on('topHolderRank', ws.topHolderRank);

});

io.of('detail').on('connection', function(socket) {
	socket.on('start', ws.start);
	socket.on('next', ws.next);
	socket.on('prev', ws.prev);
	socket.on('new', ws.newUnits);
	socket.on('info', ws.info);
	socket.on('highlightNode', ws.highlightNode);
	socket.on('nextPageTransactions', ws.nextPageTransactions);
});
server.listen(conf.webPort);
