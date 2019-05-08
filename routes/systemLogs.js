
const os 	= require('os-utils');


module.exports = (apiRoutes) => {

  apiRoutes.get(`/cpusage`, (req, res) => {
    os.cpuUsage(function(v){
      console.log( 'CPU Usage (%): ' + v );
      res.json({status: "successe", message: 'CPU Usage (%): ' + v });

    });


  }) ;

  apiRoutes.get(`/cpufree`, (req, res) => {

    os.cpuFree(function(v){
      console.log( 'CPU Free:' + v );
      res.json({status: "successe", message: 'CPU Free:' + v });

    });

  }) ;

  apiRoutes.get(`/nbcpu`, (req, res) => {

    os.cpuCount(function(v){
      console.log( 'nb CPU :' + v );
      res.json({status: "successe", message: 'nb cpu:' + v });

    });

  }) ;

  apiRoutes.get(`/memfree`, (req, res) => {

    os.freemem(function(v){
      console.log( 'mem Free:' + v );
      res.json({status: "successe", message: 'free memory:' + v });

    });

  }) ;

  apiRoutes.get(`/allmem`, (req, res) => {

    os.totalmem(function(v){
      console.log( 'mem all:' + v );
      res.json({status: "successe", message: 'totale memory:' + v });

    });

  }) ;
  apiRoutes.get(`/uptime`, (req, res) => {

    os.sysUptime(function(v){
      console.log( 'mem Free:' + v );
      res.json({status: "successe", message: 'up time:' + v });

    });

  }) ;

  apiRoutes.get(`/processuptime`, (req, res) => {

    os.processUptime(function(v){
      console.log( 'mem Free:' + v );
      res.json({status: "successe", message: 'process up time:' + v });

    });

  }) ;
}
