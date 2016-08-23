// Adding express library
var express = require('express');
var app = express();

var server;

function startServer(cb){

  server = app.listen(3031, function(){

    //console.log('Server started');
    cb();

  });
}

function startRouter(){

  // expose whole folder tree to the internet
  app.use('/', express.static('build'));

}

module.exports = {

  startServer: startServer,
  startRouter: startRouter

};
