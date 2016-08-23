// Add another file to run.js
var server = require('./server');

server.startServer(function(){

  server.startRouter();

});
