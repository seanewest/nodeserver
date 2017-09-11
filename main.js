var createServer = require('./server');

var opts = {};
opts.host = process.env['HOST'] || '127.0.0.1';
opts.port = process.env['PORT'] || 3000;
opts.todos = ['sweep floors', 'take out rubbish'];

var server = createServer(opts);

server.on('listening', function() {
  console.log('I also know that we are listening!');
});
