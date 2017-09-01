var http = require('http');

var host = process.env['HOST'] || '127.0.0.1';
var port = process.env['PORT'] || 3000;

var todos = ['sweep floors', 'take out rubbish'];

var server = http.createServer(function(req, res) {
  var headers = {
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff'
  };

  var obj = {list: todos};
  var body = JSON.stringify(obj);

  res.writeHead(200, headers);
  res.end(body);
});

server.listen(port, host, function() {
  console.log('Listening on port ' + port + ' and host ' + host);
});
