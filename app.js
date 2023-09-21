const http = require('http');
const ApiLogger = require('./filelogger');

const apiLogger = new ApiLogger('api.log');

const server = http.createServer((req, res) => {
  apiLogger.logRequest(req);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');

  apiLogger.logResponse("info", res);
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
