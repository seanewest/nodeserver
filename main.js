var http = require('http');
var url = require('url');
var zlib = require('zlib');

var host = process.env['HOST'] || '127.0.0.1';
var port = process.env['PORT'] || 3000;

var todos = ['sweep floors', 'take out rubbish'];

function sendJson(status_code, response, body) {
  //default headers sent by node are
  //
  // Connection: keep-alive
  // Date: [Date]
  // Transfer-Encoding: chunked

  //Send a gzip'd response no matter what.
  //If the request's Accept-Encoding does not
  //allow for a gzip'd response then technically
  //we should send a 406 Not Acceptable response
  //but parsing the Accept-Encoding header would be difficult
  var headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Encoding': 'gzip',
    'X-Content-Type-Options': 'nosniff'
  }

  response.writeHead(status_code, headers);
  var gzipped_body = zlib.gzipSync(body);
  response.end(gzipped_body);
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

    sendJson(200, res, body);
  }
}

function list(req, res) {
  var obj = {list: todos};
  var body = JSON.stringify(obj);

  sendJson(200, res, body);
}

var server = http.createServer(router);

server.listen(port, host, function() {
  console.log('Listening on port ' + port + ' and host ' + host);
});
