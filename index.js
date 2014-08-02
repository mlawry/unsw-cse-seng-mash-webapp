var server = require("./server");
var router = require("./router");

server.startServer(router.route);

