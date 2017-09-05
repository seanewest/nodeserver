var http = require('http');
var url = require('url');

var host = process.env['HOST'] || '127.0.0.1';
var port = process.env['PORT'] || 3000;

var todos = ['sweep floors', 'take out rubbish'];

function json_headers(body) {
  var content_length = Buffer.byteLength(body, 'utf8').toString();
  var headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': content_length,
    'X-Content-Type-Options': 'nosniff'
  }
  return headers;
}

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

    res.writeHead(200, json_headers(body));
    res.end(body);
  }
}

function list(req, res) {
  var obj = {list: todos};
  var body = JSON.stringify(obj);

  res.writeHead(200, json_headers(body));
  res.end(body);
}

var server = http.createServer(router);

server.listen(port, host, function() {
  console.log('Listening on port ' + port + ' and host ' + host);
});
