var http = require('http');
var url = require('url');

var host = process.env['HOST'] || '127.0.0.1';
var port = process.env['PORT'] || 3000;

var todos = ['sweep floors', 'take out rubbish'];

function router(req, res) {
  console.log(req.socket.remoteAddress + ': ' + req.method + ' ' + req.url);

  var pathname = url.parse(req.url).pathname;
  if (pathname === '/' && req.method === 'GET') {
    list(req, res);
  } else {
    res.writeHead(404);
    res.end();
  }
}

function list(req, res) {
  var headers = {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff'
  };

  var obj = {list: todos};
  var body = JSON.stringify(obj);

  res.writeHead(200, headers);
  res.end(body);
}

var server = http.createServer(router);

server.listen(port, host, function() {
  console.log('Listening on port ' + port + ' and host ' + host);
});
