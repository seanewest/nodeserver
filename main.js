var http = require('http');
var url = require('url');

var host = process.env['HOST'] || '127.0.0.1';
var port = process.env['PORT'] || 3000;

var todos = ['sweep floors', 'take out rubbish'];
var json_headers = {
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff'
};

function router(req, res) {
  console.log(req.socket.remoteAddress + ': ' + req.method + ' ' + req.url);

  var pathname = url.parse(req.url).pathname;
  var url_parts = pathname.split('/');

  if (pathname === '/' && req.method === 'GET') {
    list(req, res);
  } else if (url_parts.length === 2 && strIsNumber(url_parts[1])) {
    var index = parseInt(url_parts[1]);
    show(req, res, index);
  } else {
    res.writeHead(404);
    res.end();
  }
}

function strIsNumber(str) {
  return /^\d+$/.test(str);
}

function show(req, res, index) {
  if (index < 0 || index > todos.length) {
    res.writeHead(400);
    res.end();
  } else {
    var obj = todos[index];
    var body = JSON.stringify(obj);

    res.writeHead(200, json_headers);
    res.end(body);
  }
}

function list(req, res) {
  var obj = {list: todos};
  var body = JSON.stringify(obj);

  res.writeHead(200, json_headers);
  res.end(body);
}

var server = http.createServer(router);

server.listen(port, host, function() {
  console.log('Listening on port ' + port + ' and host ' + host);
});
