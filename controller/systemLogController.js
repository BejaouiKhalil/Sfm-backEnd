const socket_io = require ('socket.io');
const os 	= require('os-utils');


os.cpuUsage(function(v){
  console.log( 'CPU Usage (%): ' + v );
});

