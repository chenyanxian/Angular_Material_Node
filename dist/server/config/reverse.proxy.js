
'use strict';

var http = require('http'),
    httpProxy = require('http-proxy');

module.exports.run = function(){

  //
  // Create your proxy server and set the target in the options.
  //

    httpProxy.createProxyServer({target:'http://localhost:5555'}).listen(5556);

    //
    // Create your target server
    //
    http.createServer(function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
      res.end();
    }).listen(5555);


}
